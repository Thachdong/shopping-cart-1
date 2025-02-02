import { Header } from ".";

export default {
  component: Header,
  title: "Atoms/Header",
  args: {
    children: "Header",
  },
};

export const H1 = {
  args: {
    level: 1,
    className: "mb-4",
  },
};

export const H2 = {
  args: {
    level: 2,
  },
};

export const H3 = {
  args: {
    level: 3,
  },
};

export const H4 = {
  args: {
    level: 4,
  },
};

export const H5 = {
  args: {
    level: 5,
  },
};

export const H6 = {
  args: {
    level: 6,
  },
};
