import React from "react";
import { ImageBox } from "../components/Primitive/ImageBox/ImageBox";

export default {
  title: 'Primitive/ImageBox',
  component: ImageBox,
};

const Template = (args) => <ImageBox {...args} />;

export const Default = Template.bind({});
Default.args = {};
