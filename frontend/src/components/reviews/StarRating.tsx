import { useState } from "react";
import { FaStar } from "react-icons/fa6";

type StarRatingProps = {
  size: number;
  onRatingChange: (newRating: number) => void;
  initialRating?: number;
};

export const StarRating = ({
  size,
  onRatingChange,
  initialRating = 0,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (ratingValue: number) => {
    setRating(ratingValue);
    onRatingChange(ratingValue);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                handleClick(ratingValue);
              }}
            />
            <FaStar
              size={size}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              className="cursor-pointer"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};
