import React from "react";

import { Placeholder } from "../components/Placeholder/Placeholder";

export default {
  title: "Primitive/Placeholder",
  component: Placeholder,
  argTypes: {
    instance: {
      control: "select",
      options: [
        "Picture",
        "User",
        "File",
        "Folder",
        "Map",
        "Play",
        "Tag",
        "Music",
        "Process",
      ],
      defaultValue: "Picture",
    },
  },
};

const Template = (args) => <Placeholder {...args} />;

export const Picture = Template.bind({});
Picture.args = {
  instance: "Picture",
};

export const User = Template.bind({});
User.args = {
  instance: "User",
};

export const File = Template.bind({});
File.args = {
  instance: "File",
};

export const Folder = Template.bind({});
Folder.args = {
  instance: "Folder",
};

export const Map = Template.bind({});
Map.args = {
  instance: "Map",
};

export const Play = Template.bind({});
Play.args = {
  instance: "Play",
};

export const Tag = Template.bind({});
Tag.args = {
  instance: "Tag",
};

export const Music = Template.bind({});
Music.args = {
  instance: "Music",
};

export const Process = Template.bind({});
Process.args = {
  instance: "Process",
};
