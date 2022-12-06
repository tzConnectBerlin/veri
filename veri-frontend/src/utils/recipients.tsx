import { Badge, Image } from '@chakra-ui/react';
import { row } from '../design-system/atoms/DataTable/DataTable';
import { ADMIN_URL, BASE_URL } from '../Global';
import { getDisplayTimeRange } from './general';

export const MapVerisToDataTable = (recipients: any): row[] => {
  const newRecipients = recipients.map((veri: any) => {
    return {
      cols: [
        {
          field: 'artwork_file',
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
      actionLink: `${ADMIN_URL}/veri/${veri.id}`,
    };
  });
  return newRecipients;
};
