import { CardThumbnails } from ".";

export default {
  component: CardThumbnails,
  title: "Molecules/Card Thumbnails",
  args: {
    thumbnails: [
      "https://placehold.co/400x500.png?index=1",
      "https://placehold.co/400x500.png?index=2",
      "https://placehold.co/400x500.png?index=3",
      "https://placehold.co/400x500.png?index=4",
      "https://placehold.co/400x500.png?index=5",
      "https://placehold.co/400x500.png?index=6",
    ],
    className: "w-[175px]",
  },
};

export const Default = {};
