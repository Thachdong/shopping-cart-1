type TViewRating = {
  rating: number;
  className?: string;
};

type TTakeRating = {
  setRating: (rating: number) => void;
  rating: number;
  className?: string;
}