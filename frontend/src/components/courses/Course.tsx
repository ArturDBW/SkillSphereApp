import { Link } from "react-router-dom";
import { StarRatingStatic } from "../reviews/StarRatingStatic";
import { useEffect, useState } from "react";
import { calculateAverageRating } from "../../utils/averageRating";
import { backendURL } from "../../utils/api";

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
    slug: string;
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
    <div className="flex gap-4 border-b py-2 max-sm:flex-col">
      <img
        src={`${backendURL}/public/${courseData.imageCover}`}
        alt="Course Image"
        className="aspect-[300/160] max-w-[300px] max-sm:max-w-full"
      />
      <div className="flex w-full flex-col justify-between">
        <div>
          <div className="flex justify-between font-bold">
            <h3 className="text-lg max-md:text-base">{courseData.title}</h3>
            <span>{courseData.price}$</span>
          </div>
          <p className="w-11/12 max-md:text-xs">{courseData.description}</p>
          <span className="text-sm text-stone-500 max-md:text-xs">
            {courseData.author}
          </span>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex space-x-2">
            <StarRatingStatic stars={averageRating} size={18} />
            <span className="text-sm text-stone-500">
              ({courseData.reviews.length})
            </span>
          </div>
          <Link
            to={`/courses/${courseData.slug}`}
            onClick={() => {
              window.scrollTo({
                top: 0,
              });
            }}
            className="rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
