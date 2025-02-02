import { BlogpostCard } from ".";

export default {
  component: BlogpostCard,
  title: "Molecules/BlogpostCard",
  args: {
    id: "1",
    title: "Blogpost Title",
    description:
      "So long Blogpost Description that is so long that it needs to be cut off with a line clamp. So long Blogpost Description that is so long that it needs to be cut off with a line clamp.",
    image: "./mock-images/about-banner.jpeg",
    publishDate: "2021-01-01",
    className: "w-1/4",
  },
};

export const Default = {};
