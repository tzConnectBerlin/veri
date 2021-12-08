#!/usr/bin/env python3

import os

import asyncio
import base58
import io
import json
import psycopg2
import requests
import time
import urllib3

PINATA_API_KEY = '2109f3464ca2976029cf'  # Correct:'2109f3464ca2976029cf'
PINATA_API_SECRET = 'bac430faff56a67a2f707e69a635268e88f0781595bc9f1f8ee30e3ded5881e4'
PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5YmZiMTVjMC0xYzkxLTQxZDAtOTM1Zi0yN2EyYTE2OGIzZWUiLCJlbWFpbCI6ImpvaG4ubmV3YnlAdHpjb25uZWN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyMTA5ZjM0NjRjYTI5NzYwMjljZiIsInNjb3BlZEtleVNlY3JldCI6ImJhYzQzMGZhZmY1NmE2N2EyZjcwN2U2OWE2MzUyNjhlODhmMDc4MTU5NWJjOWYxZjhlZTMwZTNkZWQ1ODgxZTQiLCJpYXQiOjE2MzI1Nzg4ODh9.H8KpS5UNsxfai-l4m-gNFRzmGBfYPZqsod1PeCXkC4E'
PINATA_GATEWAY = 'gateway.pinata.cloud'
PINATA_PORT = 443
PINATA_URI = f"/dns/{PINATA_GATEWAY}/tcp/{PINATA_PORT}/https"

DB_HOST = 'localhost'
DB_USER = 'tezos'
DB_PASSWORD = 'tezos'
DB_NAME = 'basel'

NFT_OWNER = 'tz1QuhpvRktyXKcYFbzadova582J96u43WHk'

CONTRACT_METADATA = "ipfs://QmRbsY335V2qCaXM6MEX2ZCzuRhtHzU2v4SSBwtBMHHcMY"


class IpfsException(Exception):
    """
    Raised when upload to Pinata failed
    """

    def __init__(self, message='Ipfs failed'):
        self.message = message
        super().__init__(self.message)


def connect_db():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD)


def create_token_id(ipfs):
    b = base58.b58decode(ipfs)
    token_id = int.from_bytes(b[-6:], 'big')
    return token_id


def queue_mint_nft(recipient, content_ipfs_hash, amount):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("INSERT INTO peppermint.operations(originator, command) VALUES (%s, %s);",
                (NFT_OWNER,
                 json.dumps({
                     "handler": "nft",
                     "name": "mint",
                     "args": {
                         "token_id": create_token_id(content_ipfs_hash),
                         "to_address": recipient,
                         "metadata_ipfs": f"ipfs://{content_ipfs_hash}",
                         "amount": amount
                     }
                 })))
    conn.commit()
    conn.close()


def queue_transfer_nft(recipient, token_id):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("INSERT INTO peppermint.operations(originator, command) VALUES (%s, %s);",
                (NFT_OWNER,
                 json.dumps({
                     "handler": "nft",
                     "name": "mint",
                     "args": {
                         "from_address": NFT_OWNER,
                         "token_id": token_id,
                         "to_address": recipient,

                     }
                 })))
    conn.commit()
    conn.close()


def nft_metadata(content_ipfs_hash):
    ipfs_uri = f"ipfs://{content_ipfs_hash}"

    metadata = {
        "name": "POAP EVENT BLA BLA",
        "description": "One of a series of event badge",
        "tags": [],
        "symbol": "",
        "artifactUri": ipfs_uri,
        "creators": [],
        "formats": [
            {
                "uri": ipfs_uri,
                "mimeType": "image/jpeg"
            }
        ],
        "thumbnailUri": ipfs_uri,
        "decimals": 0,
        "isBooleanAmount": False
    }
    return metadata


def upload_nft_to_pinata(nft):
    headers = {"Authorization": f"Bearer {PINATA_JWT}"}
    r = requests.get(nft['image'])
    f = io.BytesIO(r.content)
    response = requests.post("https://api.pinata.cloud/pinning/pinFileToIPFS",
                             headers=headers,
                             files={'file': f},
                             )
    if response.status_code != 200:
        raise IpfsException
    return json.loads(response.content)


def upload_json_to_pinata(obj):
    headers = {"Authorization": f"Bearer {PINATA_JWT}"}
    response = requests.post("https://api.pinata.cloud/pinning/pinJSONToIPFS",
                             headers=headers,
                             json=obj,
                             )
    if response.status_code != 200:
        raise IpfsException
    return json.loads(response.content)


if __name__ == '__main__':
    if not os.path.exists('nfts'):
        os.mkdir('nfts')

    # with open('./nfts/vt.json') as fh:
    #     nfts = json.load(fh)
