import { Link } from "react-router-dom";
import { StarRatingStatic } from "../reviews/StarRatingStatic";
import { useEffect, useState } from "react";
import { calculateAverageRating } from "../../utils/averageRating";

type Review = {
  rating: number;
};

type CourseProps = {
  courseData: {
    title: string;
    id: number;
    author: string;
    imageCover: string;
    description: string;
    price: number;
    reviews: Review[];
  };
};
export const Course = ({ courseData }: CourseProps) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (courseData) {
      const average = calculateAverageRating(courseData);
      setAverageRating(average);
    }
  }, [courseData]);

  return (
    <div className="flex gap-4 border-b py-2">
      <img
        src={courseData.imageCover}
        alt="Course Image"
        className="aspect-[300/160] max-w-[300px]"
      />
      <div className="flex w-full flex-col justify-between">
        <div>
          <div className="flex justify-between font-bold">
            <h3 className="text-lg">{courseData.title}</h3>
            <span>{courseData.price}$</span>
          </div>
          <p className="w-11/12">{courseData.description}</p>
          <span className="text-sm text-stone-500">{courseData.author}</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex space-x-2">
            <StarRatingStatic stars={averageRating} size={18} />
            <span className="text-sm text-stone-500">
              ({courseData.reviews.length})
            </span>
          </div>
          <Link
            to={`/courses/${courseData.id}`}
            className="rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
