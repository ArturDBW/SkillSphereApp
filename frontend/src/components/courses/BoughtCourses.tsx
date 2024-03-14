import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ui/AppLayout";
import { StarRatingStatic } from "../reviews/StarRatingStatic";
import { AddNewReview } from "../reviews/AddNewReview";

type UserProps = {
  email: string;
  name: string;
  id: string;
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
  const [openReviews, setOpenReviews] = useState<{ [key: string]: boolean }>(
    {},
  );

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (openReviews && Object.values(openReviews).some((isOpen) => isOpen)) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "unset";
      }
    }
  }, [openReviews]);

  const handleOpenReview = (courseId: string) => {
    setOpenReviews((prevState) => {
      return {
        ...prevState,
        [courseId]: true,
      };
    });
  };

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
            <button
              onClick={() => handleOpenReview(course.id)}
              className="hover:underline"
            >
              Review course
            </button>
            {openReviews[course.id] && (
              <AddNewReview
                courseId={course.id}
                openReview={openReviews[course.id]}
                setOpenReview={(isOpen: boolean) =>
                  setOpenReviews((prevState) => ({
                    ...prevState,
                    [course.id]: isOpen,
                  }))
                }
              />
            )}
          </div>
        </div>
      ))}
    </section>
  );
};
