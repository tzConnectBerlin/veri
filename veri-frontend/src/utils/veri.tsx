import { Badge, Image } from '@chakra-ui/react';
import moment from 'moment';
import { row } from '../design-system/atoms/DataTable/DataTable';
import { ADMIN_URL, BASE_URL } from '../Global';
import {
  VeriDropDown,
  VeriFormValues,
  VeriListType,
  VeriFormType,
} from '../types/veris';
import { CapitalizeFirstLetter, getDisplayTimeRange, MakeURL } from './general';

export const MapVeriToServerValue = (veri: VeriFormValues) => {
  const URL = `${window.origin}/event`;
  const startDate = new Date(veri.eventStartDate).toISOString();
  const endDate =
    veri.eventDuration === 'Single'
      ? startDate
      : new Date(veri.eventStartDate).toISOString();

  return {
    event_name: veri.eventName,
    organizer: veri.description,
    organizer_email: veri.organizerEmail,
    event_type: veri.eventDuration,
    event_start_date: startDate,
    event_end_date: endDate,
    artwork_name: veri.artworkFile?.name,
    artwork_description: veri.description,
    artwork_file: veri.artworkFile,
    live_distribution: GetDistributionMethodBoolean(veri.distributionMethod),
    live_distribution_url: URL + '/' + MakeURL(veri.eventName),
    live_distribution_password: veri.password,
    status: veri.status.toLowerCase(),
  };
};

export const MapServerValueToVeri = (veri: any): VeriFormValues => {
  return {
    id: veri.id,
    eventName: veri.veri,
    organizer: veri.organizer ?? '',
    organizerEmail: veri.organizer_email,
    eventDuration: veri.event_type,
    eventStartDate: moment(new Date(veri.event_start_date)).format(
      'YYYY-MM-DDTkk:mm',
    ),
    eventEndDate: moment(new Date(veri.event_end_date)).format(
      'YYYY-MM-DDTkk:mm',
    ),
    artworkFile: veri.artwork,
    artworkName: veri.artwork,
    description: veri.artwork_description,
    distributionMethod: GetDistributionMethodString(veri.live_distribution),
    password: veri.live_distribution_password,
    status: CapitalizeFirstLetter(veri.status),
  };
};

export const MapVeriToDropDown = (veris: VeriFormType[]): VeriDropDown[] => {
  return veris
    .filter(item => item.status === 'created')
    .map((veri: any) => ({
      id: veri.id,
      title: veri.veri,
      artWork: veri.thumbnail,
    }));
};

export const MapVerisToDataTable = (veris: VeriListType[]): row[] => {
  const newVeris = veris.map((item: VeriListType) => {
    return {
      cols: [
        {
          field: 'artwork_file',
          value: (
            <Image
              borderRadius="full"
              boxSize="40px"
              src={BASE_URL + '/' + item.thumbnail}
              alt={item.veri}
            />
          ),
        },
        { field: 'event_name', value: item.veri },
        { field: 'organizer', value: item.organizer ?? '—' },
        {
          field: 'mint_date',
          value: getDisplayTimeRange(
            new Date(item.event_start_date),
            new Date(item.event_end_date),
          ),
        },
        {
          field: 'status',
          value: (
            <Badge variant={item.status.toLowerCase()}>
              {CapitalizeFirstLetter(item.status)}
            </Badge>
          ),
          sortable: true,
        },
      ],
      actionLink: `${ADMIN_URL}/veri/${item.id}`,
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
