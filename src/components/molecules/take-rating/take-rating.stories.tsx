import { TakeRating } from ".";

export default {
  component: TakeRating,
  title: "Molecules/Take Rating",
  args: {
    rating: 2,
    setRating: (newRating: number) => {
      console.log(newRating);
    },
  },
};

export const Default = {};
