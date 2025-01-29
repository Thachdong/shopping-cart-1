import { UploadThumbnails } from ".";

export default {
  component: UploadThumbnails,
  title: "Molecules/FormTags/Upload Thumbnails",
};

export const Default = {};

export const WithValues = {
  args: {
    value: [
      "./mock-images/product-1.jpeg",
      "./mock-images/product-2.webp",
      "./mock-images/product-3.webp",
      "./mock-images/product-4.webp",
    ],
  },
};
