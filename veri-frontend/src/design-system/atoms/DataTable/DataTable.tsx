import {
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
  type: 'Image' | 'Number' | 'String';
  value: string | number;
  sortable?: boolean;
}

interface row {
  cols: column[];
  actions?: {
    onEdit: () => void;
    onDelete: () => void;
  };
}

export interface DataTableProps {
  title?: string;
  header: column[];
  rows: row[];
  hasActions: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({
  title,
  header,
  rows,
  hasActions,
}) => {
  return (
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
              <Th key={h.field} isNumeric={h.type === 'Number' ? true : false}>
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
            {hasActions && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, i) => (
            <Tr key={i}>
              {row.cols.map(col => (
                <Td
                  key={col.field}
                  isNumeric={col.type === 'Number' ? true : undefined}
                >
                  {col.value}
                </Td>
              ))}
              {hasActions && row.actions && (
                <Td>
                  <ButtonGroup gap="4">
                    <Button
                      leftIcon={<MdEdit />}
                      colorScheme="blue"
                      onClick={row.actions.onEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      leftIcon={<MdDelete />}
                      colorScheme="red"
                      onClick={row.actions.onEdit}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
