import { Story, Meta } from '@storybook/react/types-6-0';
import { DragDropFileUploader } from '.';

export default {
  title: 'Atoms/FileUploader-New',
  component: DragDropFileUploader,
} as Meta;

const Template: Story = args => <DragDropFileUploader {...args} />;

export const Default = Template.bind({});
