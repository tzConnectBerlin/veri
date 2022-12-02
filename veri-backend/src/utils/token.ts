import { Veri } from '@/interfaces/veris.interface';
import { print } from '@swc/core';

export function createTokenDetails(veri: Veri) {
  return {
    name: veri.event_name,
    symbol: 'v',
    creators: veri.event_contact_email,
    date: veri.event_start_date,
  };
}

export function createImageAsset(file: Express.Multer.File) {
  return {
    filename: file.originalname,
    b64_data: file.buffer.toString('base64'),
    mime_type: file.mimetype,
  };
}

export function createRecipientList(recipients: string) {
  return JSON.stringify(recipients.split(','));
}
