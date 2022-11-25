import { Badge, Image } from '@chakra-ui/react';
import moment from 'moment';
import { row } from '../design-system/atoms/DataTable/DataTable';
import { BASE_URL, VERI_URL } from '../Global';
import { VeriFormValues, VeriType } from '../types/veris';
import { getDisplayTimeRange, MakeURL } from './general';

export const MapVeriToServerValue = (veri: VeriFormValues) => {
  const startDate = new Date(veri.eventStartDate).toISOString();
  const endDate =
    veri.eventDuration === 'Single'
      ? startDate
      : new Date(veri.eventStartDate).toISOString();

  return {
    event_name: veri.eventName,
    event_description: veri.description,
    event_contact_email: veri.organizerEmail,
    event_type: veri.eventDuration,
    event_start_date: startDate,
    event_end_date: endDate,
    artwork_name: veri.artworkFile?.name,
    artwork_description: veri.description,
    artwork_file: veri.artworkFile,
    live_distribution: GetDistributionMethodBoolean(veri.distributionMethod),
    live_distribution_url: VERI_URL + '' + MakeURL(veri.eventName),
    live_distribution_password: veri.password,
    status: veri.status,
    recipients: veri.recipients.toString(),
  };
};

export const MapServerValueToVeri = (veri: VeriType): VeriFormValues => {
  return {
    eventName: veri.event_name,
    organizer: veri.event_contact_email,
    organizerEmail: veri.event_contact_email,
    eventDuration: veri.event_type,
    eventStartDate: moment(new Date(veri.event_start_date)).format(
      'YYYY-MM-DDTkk:mm',
    ),
    eventEndDate: moment(new Date(veri.event_end_date)).format(
      'YYYY-MM-DDTkk:mm',
    ),
    artworkName: veri.artwork_name,
    description: veri.artwork_description,
    distributionMethod: GetDistributionMethodString(veri.live_distribution),
    password: veri.live_distribution_password,
    status: veri.status,
    recipients: veri.recipients,
  };
};

export const MapVerisToDataTable = (veris: any): row[] => {
  const newVeris = veris.map((veri: any) => {
    return {
      cols: [
        {
          field: 'img',
          value: (
            <Image
              borderRadius="full"
              boxSize="40px"
              src={BASE_URL + '/' + veri.file.filename}
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
      actionLink: `/veri/${veri.id}`,
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
  isLive?: 'QR-code' | 'Post-event',
): boolean => {
  return isLive === 'QR-code' ? true : false;
};
