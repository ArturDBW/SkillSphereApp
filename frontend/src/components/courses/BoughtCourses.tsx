import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ui/AppLayout";
import { StarRatingStatic } from "../reviews/StarRatingStatic";
import { AddNewReview } from "../reviews/AddNewReview";
import { API } from "../../utils/api";
import { HandleReview } from "../reviews/HandleReview";

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

type UserData = {
  rating: number;
  review: string;
  id: string;
};

export const BoughtCourses = () => {
  const [isHover, setIsHover] = useState(false);
  const user: UserProps | null = useContext(UserContext);
  const [openAddReviews, setOpenAddReviews] = useState<{
    [key: string]: boolean;
  }>({});
  const [openUpdateReviews, setOpenUpdateReviews] = useState<{
    [key: string]: boolean;
  }>({});
  const [userReviews, setUserReviews] = useState<{ [key: string]: number }>({});
  const [userData, setUserData] = useState<{ [key: string]: UserData }>({});

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (
        openAddReviews ||
        (openUpdateReviews &&
          Object.values(openAddReviews).some((isOpen) => isOpen))
      ) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "unset";
      }
    }
  }, [openAddReviews, openUpdateReviews]);

  const handleOpenReview = (courseId: string) => {
    setOpenAddReviews((prevState) => {
      return {
        ...prevState,
        [courseId]: true,
      };
    });
  };

  const handleOpenUpdateReview = (courseId: string) => {
    setOpenUpdateReviews((prevState) => {
      return {
        ...prevState,
        [courseId]: true,
      };
    });
  };

  // ---------------------------------------------------------------->

  const checkUserReviews = async (courseId: string) => {
    try {
      const response = await API.get(
        `/skillsphere/courses/${courseId}/reviews`,
      );
      const rating = response.data.data.reviews[0]?.rating || 0;
      const user = response.data.data.reviews[0];
      setUserReviews((prevState) => ({
        ...prevState,
        [courseId]: rating, // Zaktualizuj stan, przechowujący liczbę recenzji użytkownika dla danego kursu
      }));

      setUserData((prevState) => ({
        ...prevState,
        [courseId]: user, // Zaktualizuj stan, przechowujący liczbę recenzji użytkownika dla danego kursu
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    user?.boughtCourses?.forEach((course) => {
      checkUserReviews(course.id);
    });
  }, [user?.boughtCourses]);

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
          <div className="flex flex-col items-end text-sm">
            <StarRatingStatic size={18} stars={userReviews[course.id] || 0} />
            {userReviews[course.id] === 0 ? (
              <button
                onClick={() => handleOpenReview(course.id)}
                className="hover:underline"
              >
                Review course
              </button>
            ) : (
              <button
                onClick={() => handleOpenUpdateReview(course.id)}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="hover:underline"
              >
                {isHover ? "Edit review" : "Your review"}
              </button>
            )}
            {openAddReviews[course.id] && (
              <AddNewReview
                courseId={course.id}
                openReview={openAddReviews[course.id]}
                setOpenAddReview={(isOpen: boolean) =>
                  setOpenAddReviews((prevState) => ({
                    ...prevState,
                    [course.id]: isOpen,
                  }))
                }
                updateRatingUI={() => checkUserReviews(course.id)}
              />
            )}
            {openUpdateReviews[course.id] && (
              <HandleReview
                userData={userData[course.id]}
                setOpenUpdateReview={(isOpen: boolean) =>
                  setOpenUpdateReviews((prevState) => ({
                    ...prevState,
                    [course.id]: isOpen,
                  }))
                }
                updateRatingUI={() => checkUserReviews(course.id)}
              />
            )}
          </div>
        </div>
      ))}
    </section>
  );
};
