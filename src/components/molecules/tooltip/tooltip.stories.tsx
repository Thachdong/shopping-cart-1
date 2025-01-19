import { Tooltip } from ".";

export default {
  component: Tooltip,
  title: "Tooltip",
  args: {
    buttonText: "tooltip",
    content: "tooltip content",
  },
};

export const Default = {
  args: {
    position: "bottom",
  },
};

export const LongContentTooltip = {
  args: {
    position: "bottom",
    content: "Long long long long long content",
  },
};
