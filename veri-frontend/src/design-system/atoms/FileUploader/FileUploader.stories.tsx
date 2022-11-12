import { Story, Meta } from '@storybook/react/types-6-0';
import { FileUploader } from '../FileUploader';

export default {
  title: 'Atoms/FileUploader',
  component: FileUploader,
} as Meta;

const Template: Story = args => <FileUploader {...args} />;

export const Default = Template.bind({});
