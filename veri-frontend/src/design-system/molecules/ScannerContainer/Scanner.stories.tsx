import { Story, Meta } from '@storybook/react/types-6-0';
import { ScannerContainer, ScannerContainerProps } from './ScannerContainer';

export default {
  title: 'Molecules/ScannerContainer',
  component: ScannerContainer,
} as Meta;

const Template: Story<ScannerContainerProps> = args => (
  <ScannerContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  handleScan: val => console.log(val),
};
