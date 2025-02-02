import { Toast } from ".";

export default {
  component: Toast,
  title: "Molecules/Toast",
  args: {
    message: "This is a toast message",
    duration: 300000,
  },
};

export const Success = {
  args: {
    type: "success",
  },
};

export const Info = {
  args: {
    type: "info",
  },
};

export const Warning = {
  args: {
    type: "warning",
  },
};

export const ToastError = {
  args: {
    type: "error",
  },
};
