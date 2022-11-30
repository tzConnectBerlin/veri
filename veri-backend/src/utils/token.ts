import { File } from '@/interfaces/file.interface';
import { Veri } from '@/interfaces/veris.interface';

export function createTokenDetails(veri: Veri) {
  return {
    name: veri.event_name,
    symbol: 'v',
    creators: veri.event_contact_email,
    date: veri.event_start_date,
  };
}

export function createImageAsset(file: File) {
  console.log(typeof file);
  //   return {
  //     name: veri.event_name,
  //     symbol: 'v',
  //     creators: veri.event_contact_email,
  //     date: veri.event_start_date,
  //   };
}
