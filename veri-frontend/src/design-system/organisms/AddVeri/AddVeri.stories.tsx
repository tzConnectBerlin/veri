import { Story, Meta } from '@storybook/react/types-6-0';
import { AddVeri } from '../AddVeri';

export default {
  title: 'Organisms/AddVeri',
  component: AddVeri,
} as Meta;

const Template: Story = args => <AddVeri {...args} />;

export const Default = Template.bind({});
