import React from "react";
import { Input } from "../components/Control/Input/Input";

export default {
  title: 'Control/Input',
  component: Input,
  instance: {
    control: "select",
    options: [
      'TextBlock', 'Blank', 'Dropdown','SearchBox', 'IconTextIcon'
    ],
    defaultValue: "Blank",
  },
};

const Template = (args) => <Input {...args} />;
export const TextBlock = Template.bind({});

export const Blank = Template.bind({});

export const Dropdown = Template.bind({});
export const SearchBox = Template.bind({});
export const IconTextIcon = Template.bind({});

