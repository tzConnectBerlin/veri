import { Button, Heading, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVeris } from '../../../api/services/veriService';
import { DataTable } from '../../../design-system/atoms/DataTable';
import { row } from '../../../design-system/atoms/DataTable/DataTable';
import { Wrapper } from '../../../design-system/atoms/Wrapper';
import { MapVerisToDataTable } from '../../../utils/veri';

const header = [
  { field: 'img', value: 'Image' },
  { field: 'event_name', value: 'Event Name' },
  { field: 'organizer', value: 'Organizer' },
  {
    field: 'mint_date',
    value: 'Mint Date',
  },
  { field: 'status', value: 'Status', sortable: true },
];

export const VerisOverviewPage = (): JSX.Element => {
  const [veriList, setVeriList] = useState<row[]>();
  const navigate = useNavigate();
  React.useEffect(() => {
    getVeris()
      .then(res => {
        setVeriList(() => MapVerisToDataTable(res.data.data));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HStack justifyContent="space-between" mb={10}>
        <Heading>All VERIs</Heading>
        <Button colorScheme="primary" onClick={() => navigate('/veri')}>
          Create New Veri
        </Button>
      </HStack>
      <Wrapper>
        {veriList && veriList.length > 0 && (
          <DataTable header={header} rows={veriList} />
        )}
      </Wrapper>
    </motion.div>
  );
};
