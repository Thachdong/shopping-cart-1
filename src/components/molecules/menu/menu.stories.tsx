import { Menu } from ".";

export default {
  component: Menu,
  title: "Menu",
  args: {
    items: [
      { id: "1", label: "Home", url: "/" },
      { id: "2", label: "About", url: "/about" },
      { id: "3", label: "Contact", url: "/contact" },
    ],
    direction: "horizontal",
    activeId: "1",
  },
};

export const Horizontal = {};

export const Vertical = {
  args: {
    direction: "vertical",
  },
};
