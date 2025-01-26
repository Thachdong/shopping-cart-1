import { Button } from ".";

export default {
  component: Button,
  title: "Atoms/Button",
  args: {
    children: "click me",
  },
};

export const Default = {
  args: {},
};

export const Primary = {
  args: {
    variant: "primary",
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
  },
};

export const Tertiary = {
  args: {
    variant: "tertiary",
  },
};

export const Outline = {
  args: {
    variant: "outline",
  },
};
