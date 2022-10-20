import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdEdit, MdDelete } from 'react-icons/md';
import React from 'react';

interface column {
  field: string;
  isNum?: boolean;
  value: string | number | React.ReactNode;
  sortable?: boolean;
}

interface row {
  cols: column[];
  action?: () => void;
}

export interface DataTableProps {
  title?: string;
  header: column[];
  rows: row[];
}

export const DataTable: React.FC<DataTableProps> = ({
  title,
  header,
  rows,
}) => {
  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          {title && (
            <TableCaption placement="top" fontSize="2xl">
              {title}
            </TableCaption>
          )}
          <Thead>
            <Tr>
              {header.map(h => (
                <Th key={h.field} isNumeric={h.isNum}>
                  {h.sortable ? (
                    <Flex alignItems="center">
                      {h.value}
                      <IconButton
                        size="xs"
                        variant="ghost"
                        aria-label="sort"
                        icon={<IoMdArrowDropdown />}
                      />
                    </Flex>
                  ) : (
                    h.value
                  )}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, i) => (
              <Tr key={i} onClick={row.action}>
                {row.cols.map(col => (
                  <Td
                    key={col.field}
                    isNumeric={col.isNum}
                    borderBottomColor={
                      i === rows.length - 1 ? 'transparent' : 'inherit'
                    }
                  >
                    {col.value}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
