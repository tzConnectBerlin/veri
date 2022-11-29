import {
  Box,
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
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface column {
  field: string;
  isNum?: boolean;
  value: string | number | React.ReactNode;
  sortable?: boolean;
}

export interface row {
  cols: column[];
  actionLink?: string;
}

export interface DataTableProps {
  title?: string;
  header: column[];
  rows: row[];
  handleSort?: (accessor: string, sortOrder: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  title,
  header,
  rows,
  handleSort,
}) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState('asc');

  const handleSortingChange = (accessor: string) => {
    const sortOrder = order === 'asc' ? 'desc' : 'asc';
    setOrder(sortOrder);
    handleSort && handleSort(accessor, order);
  };
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
                        icon={
                          order === 'asc' ? (
                            <IoMdArrowDropdown />
                          ) : (
                            <IoMdArrowDropup />
                          )
                        }
                        onClick={() => handleSortingChange(h.field)}
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
              <Tr
                key={i}
                onClick={() => navigate(row.actionLink || '/')}
                cursor={row.actionLink ? 'pointer' : 'inherit'}
              >
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
