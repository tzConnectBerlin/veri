import { Story, Meta } from '@storybook/react/types-6-0';
import { Scanner, ScannerProps } from './Scanner';

export default {
  title: 'Atoms/Scanner',
  component: Scanner,
} as Meta;

const Template: Story<ScannerProps> = args => <Scanner {...args} />;

export const Default = Template.bind({});
Default.args = {
  handleScan: val => console.log(val),
};
