import { Story, Meta } from '@storybook/react/types-6-0';
import { Header, HeaderProps } from './Header';

export default {
  title: 'Organisms/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = args => <Header {...args} />;

export const Default = Template.bind({
  title: 'Verification',
  subtitle: 'testing subtitle',
});
