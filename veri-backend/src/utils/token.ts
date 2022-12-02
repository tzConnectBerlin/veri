import { CreateFileDto } from '@/dtos/files.dto';
import { CreateVeriDto } from '@/dtos/veris.dto';
import { Veri } from '@/interfaces/veris.interface';
import { print } from '@swc/core';

export function createTokenDetails(veri: CreateVeriDto) {
  return {
    name: veri.event_name,
    symbol: 'v',
    creators: veri.event_contact_email,
    date: veri.event_start_date,
  };
}

export function createImageAsset(file: any) {
  return {
    filename: file.originalname,
    b64_data: file.buffer.toString('base64'),
    mime_type: file.mimetype,
  };
}

export function createRecipientList(recipients: string) {
  return JSON.stringify(recipients.split(','));
}
