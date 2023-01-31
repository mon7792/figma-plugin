import React from 'react';

import { Placeholder } from '../components/Placeholder/Placeholder';

export default {
  title: 'Primitive/Placeholder',
  component: Placeholder

};

const Template = (args) => <Placeholder {...args} />;

export const Picture = Template.bind({});
