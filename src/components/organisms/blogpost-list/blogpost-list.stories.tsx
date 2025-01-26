import { BlogPostList } from ".";

export default {
  title: "Organisms/BlogPostList",
  component: BlogPostList,
  args: {
    blogposts: [
      {
        id: "1",
        title: "Title 1",
        description: "Description 1",
        image: "./mock-images/home-banner.jpg",
        publishDate: "2021-01-01",
      },
      {
        id: "2",
        title: "Title 2",
        description: "Description 2",
        image: "./mock-images/home-banner.jpg",
        publishDate: "2021-01-02",
      },
      {
        id: "3",
        title: "Title 3",
        description: "Description 3",
        image: "./mock-images/home-banner.jpg",
        publishDate: "2021-01-03",
      },
    ],
  },
};

export const Default = {};
