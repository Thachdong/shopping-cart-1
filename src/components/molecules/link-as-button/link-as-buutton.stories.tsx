import { LinkAsButton } from ".";

export default {
  component: LinkAsButton,
  title: "Molecules/Link As Button",
  args: {
    children: "link as button",
    href: "/home",
    type: "external",
  },
};

export const Default = {
  args: {
    buttonProps: {
      type: "primary",
    },
  },
};
