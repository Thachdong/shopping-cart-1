import { Button } from ".";

export default {
  component: Button,
  title: "Button",
  args: {
    children: "click me",
  },
};

export const Default = {
  args: {},
};

export const Primary = {
  args: {
    type: "primary",
  },
};

export const Secondary = {
  args: {
    type: "secondary",
  },
};

export const Tertiary = {
  args: {
    type: "tertiary",
  },
};
