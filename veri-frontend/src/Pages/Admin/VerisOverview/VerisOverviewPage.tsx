import { Button, Heading, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVeris } from '../../../api/services/veriService';
import { DataTable } from '../../../design-system/atoms/DataTable';
import { row } from '../../../design-system/atoms/DataTable/DataTable';
import { Wrapper } from '../../../design-system/atoms/Wrapper';
import { VERI_URL, VERI_STATUS } from '../../../Global';
import { MapVerisToDataTable } from '../../../utils/veri';

const header = [
  { field: 'artwork_file', value: 'Image' },
  { field: 'event_name', value: 'Event Name' },
  { field: 'organizer', value: 'Organizer' },
  {
    field: 'mint_date',
    value: 'Mint Date',
  },
  {
    field: 'status',
    value: 'Status',
    sortable: true,
  },
];

const VerisOverviewPage = (): JSX.Element => {
  const [dataTable, setDataTable] = useState<row[]>();
  const [veriList, setVeriList] = useState<any[]>();
  const navigate = useNavigate();

  const handleVeriSort = (accessor: string, sortOrder: string) => {
    if (veriList) {
      if (accessor === 'status') {
        const sorted = [...veriList].sort((a, b) =>
          VERI_STATUS.indexOf(a[accessor]) <= VERI_STATUS.indexOf(b[accessor])
            ? 1
            : -1,
        );
        setVeriList(sortOrder === 'asc' ? sorted : sorted.reverse());
        setDataTable(() => MapVerisToDataTable(veriList));
      } else {
        const sorted = [...veriList].sort((a, b) => {
          if (a[accessor] === null) return 1;
          if (b[accessor] === null) return -1;
          if (a[accessor] === null && b[accessor] === null) return 0;
          return (
            a[accessor].toString().localeCompare(b[accessor].toString(), 'en', {
              numeric: true,
            }) * (sortOrder === 'asc' ? 1 : -1)
          );
        });
        setVeriList(sorted);
        setDataTable(() => MapVerisToDataTable(sorted));
      }
    }
  };

  React.useEffect(() => {
    getVeris()
      .then(res => {
        setVeriList(res.data.data);
        setDataTable(() => MapVerisToDataTable(res.data.data));
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
        <Button
          colorScheme="primary"
          onClick={() => navigate(VERI_URL + '/create-new-veri')}
        >
          Create New Veri
        </Button>
      </HStack>
      <Wrapper>
        {dataTable && dataTable.length > 0 ? (
          <DataTable
            header={header}
            rows={dataTable}
            handleSort={handleVeriSort}
          />
        ) : (
          <Heading textAlign="center" color="gray.600" size="md" p={8}>
            There is no VERIs
          </Heading>
        )}
      </Wrapper>
    </motion.div>
  );
};

export default VerisOverviewPage;
