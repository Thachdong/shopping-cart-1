import { UploadBanner } from ".";

export default {
  component: UploadBanner,
  title: "Molecules/FormTags/UploadBanner",
};

export const Default = {};

export const WithUploadedBanner = {
  args: {
    value: "./mock-images/about-banner.jpeg",
  },
};
