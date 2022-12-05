import { Badge, Button, Circle, Heading, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Address from '../../../design-system/atoms/Address';
import DataTable, {
  DataTableProps,
} from '../../../design-system/atoms/DataTable';
import Wrapper from '../../../design-system/atoms/Wrapper';

const SamleData: DataTableProps = {
  header: [
    { field: 'img', value: 'Image' },
    { field: 'veri', value: 'Veri' },
    { field: 'recipient_address', value: 'Recipient' },
    {
      field: 'operation',
      value: 'Operation',
    },
    { field: 'status', value: 'Status', sortable: true },
  ],
  rows: [
    {
      cols: [
        { field: 'img', value: <Circle size="40px" bg="primary.50" /> },
        { field: 'veri', value: 'Event1' },
        {
          field: 'recipient_address',
          value: <Address addr="tzjhjakUbk1827nfbvjsh9809" />,
        },
        {
          field: 'operation',
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
        { field: 'veri', value: 'Event1' },
        {
          field: 'recipient_address',
          value: <Address addr="tz1DjakUbk182798hhUncslc" />,
        },
        {
          field: 'operation',
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
        { field: 'veri', value: 'Event1' },
        {
          field: 'recipient_address',
          value: <Address addr="tz3MjakUbk182798hhUfjsjrgo" />,
        },
        {
          field: 'operation',
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
        { field: 'veri', value: 'Event1' },
        {
          field: 'recipient_address',
          value: <Address addr="tz2GjakUbk182798hhUjksznjdkfj" />,
        },
        {
          field: 'operation',
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
const RecipientsPage = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HStack justifyContent="space-between" mb={10}>
        <Heading>Recipients</Heading>
        <Button colorScheme="primary" onClick={() => console.log('send Veri')}>
          Send VERIs
        </Button>
      </HStack>
      <Wrapper>
        {SamleData ? (
          <DataTable {...SamleData} />
        ) : (
          <Heading textAlign="center" color="gray.600" size="md" p={8}>
            There is no Recipients
          </Heading>
        )}
      </Wrapper>
    </motion.div>
  );
};
export default RecipientsPage;
