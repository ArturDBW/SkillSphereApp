import { Link } from "react-router-dom";

type CourseProps = {
  courseData: {
    title: string;
    _id: number;
    author: string;
    description: string;
    price: number;
  };
};
export const Course = ({ courseData }: CourseProps) => {
  return (
    <div className="flex gap-4 border-b py-2">
      <img
        src="https://www.nafrontendzie.pl/assets/featured/podstawy-react.png"
        alt="test"
        className="aspect-[300/160] max-w-[300px]"
      />
      <div className="flex w-full flex-col justify-between">
        <div>
          <div className="flex justify-between font-bold">
            <h3 className="text-lg">
              React - The Complete Guide 2024 (incl. React Router & Redux)
            </h3>
            <span>{courseData.price}$</span>
          </div>
          <p className="w-11/12">
            Dive in and learn React.js from scratch! Learn React, Hooks, Redux,
            React Router, Next.js, Best Practices and way more!
          </p>
          <span className="text-sm text-stone-500">{courseData.author}</span>
        </div>
        <div className="flex items-end justify-between">
          <span>Reviews!</span>
          <Link
            to={`/courses/${courseData._id}`}
            className="rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
