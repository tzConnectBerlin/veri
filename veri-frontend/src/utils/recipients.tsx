import { Badge, Image } from '@chakra-ui/react';
import Address from '../design-system/atoms/Address';
import { row } from '../design-system/atoms/DataTable/DataTable';
import { BASE_URL } from '../Global';
import { Recipient } from '../types';

export const MapRecipientsToDataTable = (recipients: Recipient[]): row[] => {
  const newRecipients = recipients.map((item: Recipient) => {
    return {
      cols: [
        {
          field: 'img',
          value: (
            <Image
              borderRadius="full"
              boxSize="40px"
              src={BASE_URL + '/' + item.image}
              alt={item.veri}
            />
          ),
        },
        { field: 'veri', value: item.veri },
        { field: 'recipient', value: <Address addr={item.recipient} /> },
        {
          field: 'operation',
          value: item.operation ?? '—',
        },
        {
          field: 'status',
          value: (
            <Badge variant={item.status.toLowerCase()}>{item.status}</Badge>
          ),
          sortable: true,
        },
      ],
    };
  });
  return newRecipients;
};
