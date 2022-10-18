import { Story, Meta } from '@storybook/react/types-6-0';
import { DataTable, DataTableProps } from './DataTable';

export default {
  title: 'Atoms/DataTable',
  component: DataTable,
} as Meta;

const Template: Story<DataTableProps> = args => <DataTable {...args} />;

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
  hasActions: true,
};

export const NoActions = Template.bind({});
NoActions.args = {
  ...SamleData,
  hasActions: false,
};
export const WithActions = Template.bind({});
WithActions.args = {
  ...SamleData,
};
export const WithTitle = Template.bind({});
WithTitle.args = {
  ...SamleData,
  title: 'All Veris',
};
