import React from "react";
import { Stepper } from "../components/Control/Stepper/Stepper";

export default {
  title: "Control/Stepper",
  component: Stepper,
  instance: {
    control: "select",
    options: ["Square", "Circle", "Horizontal", "Vertical"],
    defaultValue: "Square",
  },
};

const Template = (args) => <Stepper {...args} />;

export const Square = Template.bind({});
Square.args = {
  instance: "Square",
};

export const Circle = Template.bind({});
Circle.args = {
  instance: "Circle",
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  instance: "Horizontal",
};

export const Vertical = Template.bind({});
Vertical.args = {
  instance: "Vertical",
};
