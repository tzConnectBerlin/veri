import { Badge } from '@chakra-ui/react';
import { row } from '../design-system/atoms/DataTable/DataTable';
import { BASE_URL, VERI_URL } from '../Global';
import { VeriFormValues } from '../types/veris';
import { getDisplayTimeRange, MakeURL } from './general';

export const MapVeriToServerValue = (veri: VeriFormValues) => {
  const formData = new FormData();

  const startDate = new Date(veri.eventStartDate).toISOString();
  const endDate =
    veri.eventDuration === 'Single'
      ? startDate
      : new Date(veri.eventStartDate).toISOString();

  formData.append('event_name', veri.eventName);
  formData.append('event_description', veri.description ?? '');
  formData.append('event_contact_email', veri.organizerEmail);
  formData.append('event_type', veri.eventDuration?.toString() ?? '');
  formData.append('event_start_date', startDate);
  formData.append('event_end_date', endDate);
  formData.append('artwork_name', veri.artworkFile?.name ?? '');
  formData.append('artwork_description', veri.description ?? '');
  formData.append('artwork_file', veri.artworkFile ?? '');
  formData.append(
    'live_distribution',
    (veri.distributionMethod === 'QR-code' ? true : false).toString(),
  );
  formData.append(
    'live_distribution_url',
    VERI_URL + '' + MakeURL(veri.eventName),
  );
  formData.append('live_distribution_password', veri.password ?? '');
  formData.append('status', veri.status);
  formData.append('recipients', veri.recipients.toString());

  return formData;
  // return {
  //   event_name: veri.eventName,
  //   event_description: veri.description,
  //   event_contact_email: veri.organizerEmail,
  //   event_type: veri.eventDuration,
  //   event_start_date: new Date(),
  //   event_end_date: new Date(),
  //   artwork_name: veri.artworkFile?.name,
  //   artwork_description: veri.description,
  //   artwork_file: veri.artworkFile,
  //   live_distribution: veri.distributionMethod === 'QR-code' ? true : false,
  //   live_distribution_url: VERI_URL + '' + MakeURL(veri.eventName),
  //   live_distribution_password: veri.password,
  //   status: veri.status,
  //   recipients: veri.recipients,
  // };
};

const _arrayBufferToBase64 = (buffer: any) => {
  let binary = '';
  const bytes = [].slice.call(new Uint8Array(buffer));
  console.log(bytes);
  bytes.forEach(b => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

export const MapVerisToDataTable = (veris: any): row[] => {
  console.log(veris);

  const newVeris = veris.map((veri: any) => {
    // const blob = new Blob([BASE_URL + '/' + veri.file.filename], {
    //   type: veri.file.mimetype,
    // });
    // const imageUrl = URL.createObjectURL(blob);
    const base64Flag = `data:${veri.file.mimetype};base64,`;
    const base64ImgUrl = _arrayBufferToBase64(veri.file.filename);
    return {
      cols: [
        {
          field: 'img',
          value: (
            <img
              src={base64Flag + base64ImgUrl}
              alt={veri.artwork_description}
            />
          ),
        },
        { field: 'event_name', value: veri.event_name },
        { field: 'organizer', value: veri.event_contact_email },
        {
          field: 'mint_date',
          value: getDisplayTimeRange(
            new Date(veri.event_start_date),
            new Date(veri.event_end_date),
          ),
        },
        {
          field: 'status',
          value: (
            <Badge variant={veri.status.toLowerCase()}>{veri.status}</Badge>
          ),
          sortable: true,
        },
      ],
    };
  });
  return newVeris;
};

export const GetDistributionMethodString = (
  isLive: boolean,
): 'QR-code' | 'Post-event' => {
  return isLive ? 'QR-code' : 'Post-event';
};

export const GetDistributionMethodBoolean = (
  isLive: 'QR-code' | 'Post-event',
): boolean => {
  return isLive === 'QR-code' ? true : false;
};
