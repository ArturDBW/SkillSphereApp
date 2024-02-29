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
    <Link to={`/courses/${courseData._id}`}>
      <div className="flex gap-4 border-b py-2">
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
            <p className="">{courseData.description}</p>
            <span className="text-sm text-stone-500">{courseData.author}</span>
          </div>
          <span>Reviews!</span>
        </div>
      </div>
    </Link>
  );
};
