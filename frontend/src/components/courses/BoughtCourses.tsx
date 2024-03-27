import { useContext, useEffect, useState, useCallback } from "react";
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
  const [hoverState, setHoverState] = useState<{ [key: string]: boolean }>({});
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
        (openAddReviews &&
          Object.values(openAddReviews).some((isOpen) => isOpen)) ||
        (openUpdateReviews &&
          Object.values(openUpdateReviews).some((isOpen) => isOpen))
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
    setHoverState((prevState) => ({
      ...prevState,
      [courseId]: false, // ustawienie początkowe stanu isHover na false
    }));
  };

  // ---------------------------------------------------------------->

  const checkUserReviews = useCallback(
    async (courseId: string) => {
      try {
        const response = await API.get(
          `/skillsphere/courses/${courseId}/reviews/user/${user?.id}`,
        );
        const rating = response.data.data.reviews[0]?.rating || 0;
        const userData = response.data.data.reviews[0];
        setUserReviews((prevState) => ({
          ...prevState,
          [courseId]: rating, // Zaktualizuj stan, przechowujący liczbę recenzji użytkownika dla danego kursu
        }));

        setUserData((prevState) => ({
          ...prevState,
          [courseId]: userData, // Zaktualizuj stan, przechowujący liczbę recenzji użytkownika dla danego kursu
        }));
      } catch (err) {
        console.error(err);
      }
    },
    [user?.id],
  );

  useEffect(() => {
    user?.boughtCourses?.forEach((course) => {
      checkUserReviews(course.id);
    });
  }, [user?.boughtCourses, checkUserReviews]);

  return (
    <section className="grid grid-cols-3 gap-4 p-4 max-lg:grid-cols-2 max-md:grid-cols-1">
      {user?.boughtCourses?.length === 0 && (
        <h3 className="col-span-full mt-2 w-full text-center text-xl text-stone-500">
          You don't have any courses yet, buy and come back here.
        </h3>
      )}
      {user?.boughtCourses?.map((course: BoughtCourse) => (
        <div key={course.id} className="flex min-h-64 flex-col justify-between">
          <div>
            <img
              src={course.imageCover}
              alt="Course image"
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
                onMouseEnter={() =>
                  setHoverState((prevState) => ({
                    ...prevState,
                    [course.id]: true,
                  }))
                }
                onMouseLeave={() =>
                  setHoverState((prevState) => ({
                    ...prevState,
                    [course.id]: false,
                  }))
                }
                className="hover:underline"
              >
                {hoverState[course.id] ? "Edit review" : "Your review"}
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
