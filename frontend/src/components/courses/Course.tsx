import { Link } from "react-router-dom";
import test from "/ddd.avif";

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
    <div className="flex max-w-screen-md gap-4 border-b py-2">
      <img src={test} alt="test" className="aspect-[260/160] max-w-[260px]" />
      <div className="flex w-full flex-col justify-between">
        <div>
          <div className="flex justify-between font-bold">
            <h3 className="text-lg">{courseData.title}</h3>
            <span>{courseData.price}$</span>
          </div>
          <p className="">{courseData.description}</p>
        </div>
        <div className="flex flex-col">
          <span>Reviews!</span>
          <span className="text-sm text-stone-500">{courseData.author}</span>
          <Link to={`/courses/${courseData._id}`}>Tutaj</Link>
        </div>
      </div>
    </div>
  );
};
