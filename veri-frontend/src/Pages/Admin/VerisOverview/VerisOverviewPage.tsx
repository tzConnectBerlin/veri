import {
  DataTable,
  DataTableProps,
} from '../../../design-system/atoms/DataTable';
import { Wrapper } from '../../../design-system/atoms/Wrapper';

const SamleData: DataTableProps = {
  header: [
    { field: 'event_name', value: 'Event Name', type: 'String' },
    { field: 'organizer', value: 'Organizer', type: 'String' },
    { field: 'status', value: 'Status', type: 'String', sortable: true },
    {
      field: 'mint_date',
      value: 'Mint Date',
      type: 'String',
    },
  ],
  rows: [
    {
      cols: [
        { field: 'event_name', value: 'Event1', type: 'String' },
        { field: 'organizer', value: 'Organizer1', type: 'String' },
        {
          field: 'status',
          value: 'Draft',
          type: 'String',
          sortable: true,
        },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
          type: 'String',
        },
      ],
      actions: {
        onDelete: () => '',
        onEdit: () => '',
      },
    },
    {
      cols: [
        { field: 'event_name', value: 'Event1', type: 'String' },
        { field: 'organizer', value: 'Organizer1', type: 'String' },
        {
          field: 'status',
          value: 'Draft',
          type: 'String',
          sortable: true,
        },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
          type: 'String',
        },
      ],
      actions: {
        onDelete: () => '',
        onEdit: () => '',
      },
    },
    {
      cols: [
        { field: 'event_name', value: 'Event1', type: 'String' },
        { field: 'organizer', value: 'Organizer1', type: 'String' },
        {
          field: 'status',
          value: 'Draft',
          type: 'String',
          sortable: true,
        },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
          type: 'String',
        },
      ],
      actions: {
        onDelete: () => '',
        onEdit: () => '',
      },
    },
  ],
  hasActions: false,
};
export const VerisOverviewPage = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <DataTable {...SamleData} />
      </Wrapper>
    </>
  );
};
