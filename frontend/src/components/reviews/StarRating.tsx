import { useState } from "react";
import { FaStar } from "react-icons/fa6";

export const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  console.log(rating);

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
                setRating(ratingValue);
              }}
            />
            <FaStar
              size={100}
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
