import { useContext } from "react";
import { UserContext } from "../../ui/AppLayout";
import { StarRatingStatic } from "../reviews/StarRatingStatic";
import { AddNewReview } from "../reviews/AddNewReview";

type UserProps = {
  email: string;
  name: string;
  boughtCourses?: BoughtCourse[];
};

type BoughtCourse = {
  id: string;
  title: string;
  author: string;
  imageCover: string;
};

export const BoughtCourses = () => {
  const user: UserProps | null = useContext(UserContext);
  console.log(user);

  return (
    <section className="grid grid-cols-3 gap-4 p-4 ">
      {user?.boughtCourses?.map((course: BoughtCourse) => (
        <div key={course.id} className="flex min-h-64 flex-col justify-between">
          <div>
            <img
              src="https://www.nafrontendzie.pl/assets/featured/podstawy-react.png"
              alt="test"
              className="aspect-[300/160]"
            />

            <h3 className="text-lg font-bold">{course.title}</h3>
            <span className="text-sm text-stone-500">{course.author}</span>
          </div>
          <div className="flex flex-col items-end">
            <StarRatingStatic size={18} stars={0} />
            <button className="hover:underline">Review course</button>
            <AddNewReview />
          </div>
        </div>
      ))}
    </section>
  );
};
