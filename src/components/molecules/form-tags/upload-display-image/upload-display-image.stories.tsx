import { UploadDisplayImage } from ".";

export default {
  component: UploadDisplayImage,
  title: "Molecules/FormTags/Upload Display Image",
};

export const Default = {};

export const WithImage = {
  args: {
    value: "./mock-images/product-1.jpeg",
  },
};
