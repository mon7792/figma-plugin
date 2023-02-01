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
TextBlock.args = {
  instance: "TextBlock"
};

export const Blank = Template.bind({});
Blank.args = {
  instance: "Blank"
};

export const Dropdown = Template.bind({});
Dropdown.args = {
  instance: "Dropdown"
};
export const SearchBox = Template.bind({});
SearchBox.args = {
  instance: "SearchBox"
};
export const IconTextIcon = Template.bind({});
IconTextIcon.args = {
  instance: "IconTextIcon"
};
