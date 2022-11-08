import { Story, Meta } from '@storybook/react/types-6-0';
import { RecipientsForm, RecipientsFormProps } from '../RecipientsForm';

export default {
  title: 'Molecules/RecipientsForm',
  component: RecipientsForm,
} as Meta;

const Template: Story<RecipientsFormProps> = args => (
  <RecipientsForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Recipients',
};
