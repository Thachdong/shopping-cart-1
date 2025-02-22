import { Link } from ".";

export default {
  component: Link,
  title: "Atoms/Link",
  args: {
    children: "link",
    href: "/home",
  },
};

export const Default = {};

export const ExternalLink = {
  args: {
    type: "external",
  },
};
