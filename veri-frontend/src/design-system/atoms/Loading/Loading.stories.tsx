import * as React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Loading } from './Loading';

export default {
  title: 'Atoms/Loading',
  component: Loading,
} as Meta;

const Template = () => <Loading />;

export const Default = Template.bind({});
