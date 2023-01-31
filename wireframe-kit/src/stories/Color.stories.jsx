import React from "react";

import { Color } from "../components/Color/Color";

export default {
  title: "Primitive/Color",
  component: Color,
  argTypes: {
    instance: {
      control: "select",
      options: [
        "color-native",
        "color-bloo-30",
        "color-bloo-20",
        "color-bloo-10",
        "color-primary",
      ],
      defaultValue: "color-native",
    },
  },
};

const Template = (args) => <Color {...args} />;

export const Native = Template.bind({});
Native.args = {
  instance: "color-native"
};

export const Bloo30 = Template.bind({});
Bloo30.args = {
  instance: "color-bloo-30"
};

export const Bloo20 = Template.bind({});
Bloo20.args = {
  instance: "color-bloo-20"
};

export const Bloo10 = Template.bind({});
Bloo10.args = {
  instance: "color-bloo-10"
};

export const Primary = Template.bind({});
Primary.args = {
  instance: "color-primary"
};
