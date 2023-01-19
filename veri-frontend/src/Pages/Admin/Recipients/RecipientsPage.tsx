import { Button, Heading, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecipients } from '../../../api/services/recipientsService';
import { DataTable } from '../../../design-system/atoms/DataTable';
import { row } from '../../../design-system/atoms/DataTable/DataTable';
import Wrapper from '../../../design-system/atoms/Wrapper';
import { RECIPIENTS_URL, RECIPIENT_STATUS } from '../../../Global';
import { Recipient } from '../../../types';
import { MapRecipientsToDataTable } from '../../../utils/recipients';

const header = [
  { field: 'img', value: 'Image' },
  { field: 'veri', value: 'Veri' },
  { field: 'recipient', value: 'Recipient' },
  {
    field: 'operation',
    value: 'Operation',
  },
  { field: 'status', value: 'Status', sortable: true },
];
const RecipientsPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState<row[]>();
  const [recipientList, setRecipientList] = useState<Recipient[]>();

  React.useEffect(() => {
    getRecipients()
      .then(res => {
        setRecipientList(res.data.data);
        setDataTable(() => MapRecipientsToDataTable(res.data.data));
      })
      .catch(err => console.log(err));
  }, []);

  const handleSort = (accessor: string, sortOrder: string) => {
    if (recipientList && accessor === 'status') {
      const sorted = [...recipientList].sort((a, b) =>
        RECIPIENT_STATUS.indexOf(a[accessor]) <=
        RECIPIENT_STATUS.indexOf(b[accessor])
          ? 1
          : -1,
      );
      setRecipientList(sortOrder === 'asc' ? sorted : sorted.reverse());
      setDataTable(() => MapRecipientsToDataTable(recipientList));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HStack justifyContent="space-between" mb={10}>
        <Heading>Recipients</Heading>
        <Button
          colorScheme="primary"
          onClick={() => navigate(RECIPIENTS_URL + '/send-veris')}
        >
          Send VERIs
        </Button>
      </HStack>
      <Wrapper>
        {dataTable && dataTable.length > 0 ? (
          <DataTable header={header} rows={dataTable} handleSort={handleSort} />
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
