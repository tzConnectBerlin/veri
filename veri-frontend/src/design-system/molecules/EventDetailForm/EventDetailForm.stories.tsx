import { Story, Meta } from '@storybook/react/types-6-0';
import { EventDetailForm, EventDetailFormProps } from '../EventDetailForm';

export default {
  title: 'Molecules/EventDetailForm',
  component: EventDetailForm,
} as Meta;

const Template: Story<EventDetailFormProps> = args => (
  <EventDetailForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'EVENT DETAILS',
};
