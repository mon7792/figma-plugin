import React from 'react';

import { Typography } from '../components/Primitive/Typography/Typography';

export default {
  title: 'Primitive/Typography',
  component: Typography,
  argTypes: {
    
  },
};

const Template = (args) => <Typography {...args} />;

export const Bold = Template.bind({});
Bold.args = {
  type: "Bold"
};

export const SemiBold = Template.bind({});
SemiBold.args = {
  type: "SemiBold"
};

export const Medium = Template.bind({});
Medium.args = {
  type: "Medium"
};

