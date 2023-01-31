import React from "react";

import { TextBlock } from "../components/TextBlock/TextBlock";

export default {
  title: "Primitive/TextBlock",
  component: TextBlock,
  argTypes: {
    size: {
      control: "select",
      options: [
        'Small', 'Medium', 'Large'
      ],
      defaultValue: "Small",
    },
    color: {
      control: "select",
      options: [
        'Native-Dark', 'Bloo-300-Dark', 'Bloo-20-Dark','Bloo-10-Dark', 'Primary-Dark'
      ],
      defaultValue: "Primary-Dark",
    },
  },
};

const Template = (args) => <TextBlock {...args} />;

export const LargePrimary = Template.bind({});
LargePrimary.args = {
  size: "Large",
  color: "Primary-Dark"
};

export const Large200 = Template.bind({});
Large200.args = {
  size: "Large",
  color: "Bloo-20-Dark"
};

export const Large100 = Template.bind({});
Large100.args = {
  size: "Large",
  color: "Bloo-10-Dark"
};

export const MediumPrimary = Template.bind({});
MediumPrimary.args = {
  size: "Medium",
  color: "Primary-Dark"
};

export const Medium200 = Template.bind({});
Medium200.args = {
  size: "Medium",
  color: "Bloo-20-Dark"
};

export const Medium100 = Template.bind({});
Medium100.args = {
  size: "Medium",
  color: "Bloo-10-Dark"
};

export const SmallPrimary = Template.bind({});
SmallPrimary.args = {
  size: "Small",
  color: "Primary-Dark"
};

export const Small200 = Template.bind({});
Small200.args = {
  size: "Small",
  color: "Bloo-20-Dark"
};

export const Small100 = Template.bind({});
Small100.args = {
  size: "Small",
  color: "Bloo-10-Dark"
};