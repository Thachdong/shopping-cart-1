import { Tooltip } from ".";

export default {
  component: Tooltip,
  title: "Molecules/Tooltip",
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
    position: "bottom-left",
    content:
      "Long long long long long content Long long long long long content Long long long long long content Long long long long long content Long long long long long content Long long long long long content Long long long long long content Long long long long long content Long long long long long content ",
  },
};
