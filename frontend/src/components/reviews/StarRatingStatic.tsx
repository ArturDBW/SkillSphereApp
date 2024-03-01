import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

export const StarRatingStatic = ({
  stars,
  size,
}: {
  stars: number;
  size: number;
}) => {
  const [rating, setRating] = useState(stars);

  useEffect(() => {
    setRating(stars);
  }, [stars]);

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <FaStar
            key={i}
            size={size}
            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
          />
        );
      })}
    </div>
  );
};
