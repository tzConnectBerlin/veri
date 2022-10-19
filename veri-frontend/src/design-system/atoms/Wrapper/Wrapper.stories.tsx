import { Story, Meta } from '@storybook/react/types-6-0';
import { DataTable, DataTableProps } from '../DataTable';
import { Wrapper, WrapperProps } from '../Wrapper';

export default {
  title: 'Atoms/Wrapper',
  component: Wrapper,
} as Meta;

const Template: Story<WrapperProps> = args => <Wrapper {...args} />;

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

export const DataTableWrapper = Template.bind({});
DataTableWrapper.args = {
  children: <DataTable {...SamleData} />,
};
