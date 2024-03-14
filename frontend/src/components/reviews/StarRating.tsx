import { useState } from "react";
import { FaStar } from "react-icons/fa6";

type StarRatingProps = {
  size: number;
  onRatingChange: (newRating: number) => void;
};

export const StarRating = ({ size, onRatingChange }: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (ratingValue: number) => {
    setRating(ratingValue);
    onRatingChange(ratingValue); // przekazanie oceny do funkcji zwrotnej
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
