import React from "react";
import { Logo } from "../components/Logo/Logo";

export default {
  title: 'Primitive/Logo',
  component: Logo,
};

const Template = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {};
