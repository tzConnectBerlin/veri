import { Badge, Button, Circle, Heading, HStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getVeris } from '../../../api/services/veriService';
import {
  DataTable,
  DataTableProps,
} from '../../../design-system/atoms/DataTable';
import { Wrapper } from '../../../design-system/atoms/Wrapper';

const SamleData: DataTableProps = {
  header: [
    { field: 'img', value: 'Image' },
    { field: 'event_name', value: 'Event Name' },
    { field: 'organizer', value: 'Organizer' },
    {
      field: 'mint_date',
      value: 'Mint Date',
    },
    { field: 'status', value: 'Status', sortable: true },
  ],
  rows: [
    {
      cols: [
        { field: 'img', value: <Circle size="40px" bg="primary.50" /> },
        { field: 'event_name', value: 'Event1' },
        { field: 'organizer', value: 'Organizer1' },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
        },
        {
          field: 'status',
          value: <Badge variant="draft">Draft</Badge>,
          sortable: true,
        },
      ],
    },
    {
      cols: [
        { field: 'img', value: <Circle size="40px" bg="primary.50" /> },
        { field: 'event_name', value: 'Event1' },
        { field: 'organizer', value: 'Organizer1' },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
        },
        {
          field: 'status',
          value: <Badge variant="created">Created</Badge>,
          sortable: true,
        },
      ],
    },
    {
      cols: [
        { field: 'img', value: <Circle size="40px" bg="primary.50" /> },
        { field: 'event_name', value: 'Event1' },
        { field: 'organizer', value: 'Organizer1' },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
        },
        {
          field: 'status',
          value: <Badge variant="minting">Minting</Badge>,
          sortable: true,
        },
      ],
    },
    {
      cols: [
        { field: 'img', value: <Circle size="40px" bg="primary.50" /> },
        { field: 'event_name', value: 'Event1' },
        { field: 'organizer', value: 'Organizer1' },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
        },
        {
          field: 'status',
          value: <Badge variant="minted">Minted</Badge>,
          sortable: true,
        },
      ],
    },
  ],
};

export const VerisOverviewPage = (): JSX.Element => {
  const navigate = useNavigate();
  React.useEffect(() => {
    getVeris()
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <>
      <HStack justifyContent="space-between" mb={10}>
        <Heading>All VERIs</Heading>
        <Button colorScheme="primary" onClick={() => navigate('/veri')}>
          Create New Veri
        </Button>
      </HStack>
      <Wrapper>
        <DataTable {...SamleData} />
      </Wrapper>
    </>
  );
};
