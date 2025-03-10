import { Modal } from ".";

export default {
  component: Modal,
  title: "Molecules/modal",
  args: {
    open: true,
    children: "This is modal",
  },
};

export const Default = {};

export const WithHeader = {
  args: {
    open: true,
    children: "This is modal content",
    header: <h1>Title header</h1>,
  },
};
