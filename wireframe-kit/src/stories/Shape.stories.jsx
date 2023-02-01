import React from "react";
import { Shape } from "../components/Shape/Shape";

export default {
  title: 'Primitive/Shape',
  component: Shape,
  instance: {
    control: "select",
    options: [
      'Square', 'Circle', 'Triangle'
    ],
    defaultValue: "Square",
  },
};

const Template = (args) => <Shape {...args} />;

export const Square = Template.bind({});
Square.args = {
  instance: "Square"
};

export const Circle = Template.bind({});
Circle.args = {
  instance: "Circle"
};

export const Triangle = Template.bind({});
Triangle.args = {
  instance: "Triangle"
};
