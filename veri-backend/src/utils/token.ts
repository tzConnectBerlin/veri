import { CreateFileDto } from '@/dtos/files.dto';
import { CreateVeriDto } from '@/dtos/veris.dto';

export function createTokenDetails(veri: CreateVeriDto) {
  return {
    name: veri.event_name,
    description: veri.artwork_description,
    tags: ['veri'],
    creators: veri.organizer,
    date: veri.event_start_date,
  };
}

export function createImageAsset(file: CreateFileDto, buffer: Buffer) {
  return {
    filename: file.originalname,
    b64_data: buffer.toString('base64'),
    mime_type: file.mimetype,
  };
}

export function createRecipientList(recipients: string) {
  return JSON.stringify(recipients.split(','));
}
