import { Story, Meta } from '@storybook/react/types-6-0';
import { VeriDetailForm, VeriDetailFormProps } from '../VeriDetailForm';

export default {
  title: 'Molecules/VeriDetailForm',
  component: VeriDetailForm,
} as Meta;

const Template: Story<VeriDetailFormProps> = args => (
  <VeriDetailForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Veri DETAILS',
  onSubmit: () => console.log('hello'),
  initialValues: {
    artwork: '',
    description: '',
  },
};

export const ByEventTitle = Template.bind({});
ByEventTitle.args = {
  title: 'Veri DETAILS',
  onSubmit: () => console.log('hello'),
  initialValues: {
    artwork: '',
    description: '',
  },
  eventTitle: 'test',
};
