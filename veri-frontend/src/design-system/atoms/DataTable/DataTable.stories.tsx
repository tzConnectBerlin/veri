import { Story, Meta } from "@storybook/react/types-6-0";
import { DataTable, DataTableProps } from "./DataTable";

export default {
  title: "Atoms/DataTable",
  component: DataTable,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as Meta;

const Template: Story<DataTableProps> = (args) => <DataTable {...args} />;

const SamleData: DataTableProps = {
  title: "All Veris",
  header: [
    { field: "event_name", value: "Event Name", type: "String" },
    { field: "organizer", value: "Event Name", type: "String" },
    { field: "status", value: "Event Name", type: "String", sortable: true },
    { field: "event_name", value: "Event Name", type: "String" },
  ],
  rows: [
    {
      cols: [
        { field: "event_name", value: "Event Name", type: "String" },
        { field: "organizer", value: "Event Name", type: "String" },
        {
          field: "status",
          value: "Event Name",
          type: "String",
          sortable: true,
        },
        { field: "event_name", value: "Event Name", type: "String" },
      ],
      actions: {
        onDelete: () => "",
        onEdit: () => "",
      },
    },
    {
      cols: [
        { field: "event_name", value: "Event Name", type: "String" },
        { field: "organizer", value: "Event Name", type: "String" },
        {
          field: "status",
          value: "Event Name",
          type: "String",
          sortable: true,
        },
        { field: "event_name", value: "Event Name", type: "String" },
      ],
      actions: {
        onDelete: () => "",
        onEdit: () => "",
      },
    },
    {
      cols: [
        { field: "event_name", value: "Event Name", type: "String" },
        { field: "organizer", value: "Event Name", type: "String" },
        {
          field: "status",
          value: "Event Name",
          type: "String",
          sortable: true,
        },
        { field: "event_name", value: "Event Name", type: "String" },
      ],
      actions: {
        onDelete: () => "",
        onEdit: () => "",
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
