import { Story, Meta } from '@storybook/react/types-6-0';
import { Address, AddressProps } from '../Address';

export default {
  title: 'Atoms/Address',
  component: Address,
} as Meta;

const Template: Story<AddressProps> = args => <Address {...args} />;

export const Small = Template.bind({});
Small.args = {
  addr: 'tz123kajskjh7kjahfkajfh66',
};

export const Medium = Template.bind({});
Medium.args = {
  addr: 'tz123kajskjh7kjahfkajfh66',
  trimSize: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  addr: 'tz123kajskjh7kjahfkajfh66',
  trimSize: 'large',
};
