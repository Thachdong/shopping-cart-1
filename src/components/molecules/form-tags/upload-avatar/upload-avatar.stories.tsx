import { UploadAvatar } from ".";

export default {
  component: UploadAvatar,
  title: "Molecules/FormTags/UploadAvatar",
  args: {
    width: 100,
    height: 100,
  },
};

export const Default = {};

export const WithValue = {
  args: {
    value: "./mock-images/product-1.jpeg",
  },
};

export const WithDisabled = {
  args: {
    disabled: true,
    value: "./mock-images/product-1.jpeg",
  },
};
