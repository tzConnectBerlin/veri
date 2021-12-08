import './App.css';
import styled from '@emotion/styled';

import { RPC_URL, KUKAI_NETWORK, NETWORK } from './config';
import { Networks } from 'kukai-embed';
import { KukaiEmbed } from 'kukai-embed';
import { useEffect, useState } from 'react';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit, MichelCodecPacker } from '@taquito/taquito';
import { Button, Stack } from '@mui/material';
import { NetworkType } from '@airgap/beacon-sdk';
var QRCode = require('qrcode.react');

const StyledPageWrapper = styled(Stack)`
  padding-left: 10rem;
  padding-right: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  @media (max-width: 900px) {
    padding-left: 8rem;
    padding-right: 8rem;
  }

  @media (max-width: 600px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

const Logo = styled.img`
  margin: auto;
  width: 15rem;
`

const StackHeader = styled(Stack)`
  top: 10rem;
  position: absolute;
  margin: auto;
  transition: top 0.2s;

  @media (max-width: 900px) {
    top: 6rem;
  }

  @media (max-width: 600px) {
    top: 2rem;
  }
`

const StyledIntro = styled.p`
  margin: auto;
  margin-top: 2rem !important;
  width: 45%;
  transition: width 0.2s;

  @media (max-width: 900px) {
    width: 65%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`

const StyledButton = styled(Button)`
  min-width: 10rem;
  margin-top: 4rem !important;
  margin: auto;

  color: black;
  background-color: white;

  border-radius: 2rem;

  outline: 1px solid black;

  :hover {
    background-color: white;
    outline: 2px solid black;
  }

  :active {
    background-color: white;
    outline: 2px solid #C4C4C4;

  }
`

const StyledQRCode = styled(QRCode)`
  margin-top: 4rem !important;
  margin: auto;
`

function App() {

  const [beaconLoading, setBeaconLoading] = useState(false);
  const [beaconWallet, setBeaconWallet] = useState();

  const [userAddress, setUserAddress] = useState();

  useEffect(() => {
    initTezos()
    setBeaconWallet(initWallet())
  }, []);

  const initTezos = (url = RPC_URL) => {
    const Tezos = new TezosToolkit(url);
    const beaconWallet = initWallet();
    Tezos.setWalletProvider(beaconWallet);
  };

  const initWallet = () => {
    const options = {
      name: 'POAP',
      iconUrl: 'https://tezostaquito.io/img/favicon.png',
      preferredNetwork: NetworkType[NETWORK],
      eventHandlers: {
        PERMISSION_REQUEST_SUCCESS: {
          handler: async (data) => {
            console.log('permission data:', data);
          },
        },
      },
    };

    return new BeaconWallet(options);
  };

  const requestUserWalletPermission = async (
    loginType,
  ) => {
    if (beaconWallet && loginType === 'beacon') {
      setBeaconLoading(true);
      try {
        const permissions = await beaconWallet.client
          .requestPermissions({
            network: {
              type: NetworkType[NETWORK],
            },
          })

        setUserAddress(permissions.address)
      } catch (error) {
        console.log(error);
      }

      setBeaconLoading(false);
    }
  };

  return (
    <div className="App">
      <StyledPageWrapper direction="column">
        <StackHeader direction="column">
          <Logo src='./Logo.svg' />
          <StyledIntro>
            POAP is a new way of keeping a reliable record of life experiences.
            Each time they take part on an event, POAP collectors get a unique badge that is supported by a cryptographic record.
          </StyledIntro>
          {
            userAddress === undefined ?
              <StyledButton
                variant="contained"
                onClick={() => requestUserWalletPermission('beacon')}
                loading={beaconLoading}
              >
                Generate QR-code
              </StyledButton>
              :
              <StyledQRCode value={`https://tzkt.io/${userAddress}`} />
          }

        </StackHeader>
      </StyledPageWrapper>
    </div>
  );
}

export default App;
