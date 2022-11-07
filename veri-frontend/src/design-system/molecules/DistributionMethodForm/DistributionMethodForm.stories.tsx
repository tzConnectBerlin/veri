import { Story, Meta } from '@storybook/react/types-6-0';
import {
  DistributionMethodForm,
  DistributionMethodFormProps,
} from '../DistributionMethodForm';

export default {
  title: 'Molecules/DistributionMethodForm',
  component: DistributionMethodForm,
} as Meta;

const Template: Story<DistributionMethodFormProps> = args => (
  <DistributionMethodForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Distribution Method',
  onSubmit: () => console.log('hello'),
  initialValues: {
    distributionMethod: 'QR code scanner',
  },
};
