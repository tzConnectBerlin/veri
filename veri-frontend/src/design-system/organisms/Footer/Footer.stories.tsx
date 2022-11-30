import { Story, Meta } from '@storybook/react/types-6-0';
import { Footer, FooterProps } from './Footer';

export default {
  title: 'Organisms/Footer',
  component: Footer,
} as Meta;

const Template: Story<FooterProps> = args => <Footer {...args} />;

export const Default = Template.bind({
  links: [
    {
      title: 'TZ Connect',
      url: 'https://tzconnect.com/',
    },
    {
      title: 'Imprint',
      url: 'https://tzconnect.com/en/imprint/',
    },
    {
      title: 'Privacy Policy',
      url: 'https://tzconnect.com/en/privacy-policy/',
    },
  ],
});
