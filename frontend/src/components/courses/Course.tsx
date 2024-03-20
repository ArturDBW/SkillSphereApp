import { Link } from "react-router-dom";
import { StarRatingStatic } from "../reviews/StarRatingStatic";

type CourseProps = {
  courseData: {
    title: string;
    id: number;
    author: string;
    description: string;
    price: number;
  };
};
export const Course = ({ courseData }: CourseProps) => {
  return (
    <div className="mt-2 flex gap-4 border-b py-2">
      <img
        src="https://www.nafrontendzie.pl/assets/featured/podstawy-react.png"
        alt="test"
        className="aspect-[300/160] max-w-[300px]"
      />
      <div className="flex w-full flex-col justify-between">
        <div>
          <div className="flex justify-between font-bold">
            <h3 className="text-lg">{courseData.title}</h3>
            <span>{courseData.price}$</span>
          </div>
          <p className="w-11/12">
            Dive in and learn React.js from scratch! Learn React, Hooks, Redux,
            React Router, Next.js, Best Practices and way more!
          </p>
          <span className="text-sm text-stone-500">{courseData.author}</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex space-x-2">
            <StarRatingStatic stars={2} size={18} />
            <span className="text-sm text-stone-500">(25)</span>
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
