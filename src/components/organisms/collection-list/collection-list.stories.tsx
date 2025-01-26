import { CollectionList } from ".";

export default {
  title: "Organisms/CollectionList",
  component: CollectionList,
  args: {
    collections: [
      {
        id: "1",
        title: "Collection 1",
        description: "Description 1",
        banner: "./mock-images/home-banner.jpg",
      },
      {
        id: "2",
        title: "Collection 2",
        description: "Description 2",
        banner: "./mock-images/about-banner.jpeg",
      },
      {
        id: "3",
        title: "Collection 3",
        description: "Description 3",
        banner: "./mock-images/collection-banner.jpeg",
      },
    ],
  },
};

export const Default = {};
