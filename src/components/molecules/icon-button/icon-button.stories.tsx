import { Icon } from "@/components/atoms/icon";
import { IconButton } from ".";

export default {
  component: IconButton,
  title: "Icon Button",
  args: {
    children: "Click Me",
  },
};

export const Default = {
  args: {},
};

export const ButtonWithAppenIcon = {
  args: {
    // @ts-ignore
    appendIcon: <Icon name="square-plus" />,
  },
};

export const ButtonWithTwoIcon = {
  args: {
    // @ts-ignore
    appendIcon: <Icon name="square-plus" />,
    // @ts-ignore
    prependIcon: <Icon name="edit" />,
  },
};

export const PrimaryButtonWithTwoIcon = {
  args: {
    // @ts-ignore
    appendIcon: <Icon name="square-plus" />,
    // @ts-ignore
    prependIcon: <Icon name="edit" />,
    type: "primary",
  },
};

export const secondaryButtonWithTwoIcon = {
  args: {
    // @ts-ignore
    appendIcon: <Icon name="square-plus" />,
    // @ts-ignore
    prependIcon: <Icon name="edit" />,
    type: "secondary",
  },
};
