import React from "react";
import { Shape } from "../components/Shape/Shape";

export default {
  title: 'Primitive/Shape',
  component: Shape,
};

const Template = (args) => <Shape {...args} />;

export const Square = Template.bind({});
Square.args = {};

export const Circle = Template.bind({});
Circle.args = {};

export const Triangle = Template.bind({});
Triangle.args = {};
