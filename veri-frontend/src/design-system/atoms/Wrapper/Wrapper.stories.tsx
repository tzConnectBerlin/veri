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
    { field: 'event_name', value: 'Event Name' },
    { field: 'organizer', value: 'Organizer' },
    { field: 'status', value: 'Status', sortable: true },
    {
      field: 'mint_date',
      value: 'Mint Date',
    },
  ],
  rows: [
    {
      cols: [
        { field: 'event_name', value: 'Event1' },
        { field: 'organizer', value: 'Organizer1' },
        {
          field: 'status',
          value: 'Draft',

          sortable: true,
        },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
        },
      ],
    },
    {
      cols: [
        { field: 'event_name', value: 'Event1' },
        { field: 'organizer', value: 'Organizer1' },
        {
          field: 'status',
          value: 'Draft',

          sortable: true,
        },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
        },
      ],
    },
    {
      cols: [
        { field: 'event_name', value: 'Event1' },
        { field: 'organizer', value: 'Organizer1' },
        {
          field: 'status',
          value: 'Draft',

          sortable: true,
        },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
        },
      ],
    },
  ],
};

export const DataTableWrapper = Template.bind({});
DataTableWrapper.args = {
  children: <DataTable {...SamleData} />,
};
