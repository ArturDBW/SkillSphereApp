import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { API } from "../utils/api";
import { Review } from "../components/reviews/Review";
import { StarRatingStatic } from "../components/reviews/StarRatingStatic";
import { calculateAverageRating } from "../utils/averageRating";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { AlertContext, UserContext } from "../ui/AppLayout";

type UserProps = {
  email: string;
  name: string;
  id: string;
};

type ReviewData = {
  id: string;
  rating: number;
  review: string;
  user: {
    name: string;
    imageCover: string;
  };
};

type Course = {
  title: string;
  id: number;
  author: string;
  imageCover: string;
  description: string;
  createdAt: string;
  price: number;
  reviews: ReviewData[];
};

export const CourseDetails = () => {
  const user: UserProps | null = useContext(UserContext);
  const { slug } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();

  const alertContext = useContext(AlertContext);
  if (!alertContext) {
    throw new Error("AlertContext not provided");
  }
  const { setShowAlert, setAlertInfo } = alertContext;

  useEffect(() => {
    const fetchOneCourse = async (slug: string) => {
      try {
        const response = await API.get(`/skillsphere/courses/${slug}`);
        setCourse(response.data.data.course);
      } catch (err) {
        console.error("Błąd podczas pobierania danych kursu", err);
      }
    };

    fetchOneCourse(slug!);
  }, [slug]);

  useEffect(() => {
    if (course) {
      const average = calculateAverageRating(course);
      setAverageRating(average);
    }
  }, [course]);

  const buyCourse = async (courseId: number) => {
    try {
      const response = await API.post(
        `/skillsphere/buy/course/${courseId}/user/${user?.id}`,
      );
      setAlertInfo("You bought the course!"),
        setShowAlert(true),
        console.log(response, "Kupiono kurs!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="mt-4 min-h-[calc(100vh-72px)]">
      <div className="mx-auto max-w-screen-xl px-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center duration-150 hover:text-yellow-500"
        >
          <IoArrowBackSharp className="mr-3" />
          Back
        </button>
        {course ? (
          <div>
            <div className="flex gap-x-2 border-b py-10 max-lg:py-4 max-sm:flex-col">
              <div className="flex w-2/3 flex-col justify-between max-lg:w-1/2 max-sm:w-full">
                <div>
                  <img
                    src={course.imageCover}
                    alt="image"
                    className="hidden rounded-xl max-sm:block"
                  />
                  <h2 className="text-5xl font-bold max-lg:text-4xl max-md:text-xl">
                    {course.title}
                  </h2>
                  <p className="mb-2 mt-6 text-xl max-xl:mt-2 max-lg:text-lg max-md:text-sm">
                    {course.description}
                  </p>
                  <div className="flex">
                    <StarRatingStatic stars={averageRating} size={28} />
                    <span className="text-sm text-stone-500">
                      ({course.reviews.length})
                    </span>
                  </div>
                </div>

                <div className="max-lg:text-sm max-sm:mt-2">
                  <span className="block">
                    Created by: <span>{course.author}</span>
                  </span>
                  <span>Created at: {course.createdAt}</span>
                </div>
              </div>
              <div className="flex w-1/3 flex-col justify-between max-lg:w-1/2 max-sm:mt-4 max-sm:w-full">
                <img
                  src={course.imageCover}
                  alt="image"
                  className="rounded-xl  max-sm:hidden "
                />
                <div className="text-xl font-bold">{course.price}$ </div>
                <button
                  onClick={() => buyCourse(course.id)}
                  className="rounded-xl bg-yellow-500 py-3 max-sm:mt-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="flex max-w-3xl flex-col">
              {course.reviews.length > 0 ? (
                <h2 className="mb-6 mt-10 text-4xl font-bold">Reviews</h2>
              ) : (
                <span className="mt-10 text-2xl">
                  There are no reviews for this course yet.
                </span>
              )}
              {showAllReviews && course.reviews.length > 0 ? (
                <Review
                  reviewsData={course.reviews[0]}
                  key={course.reviews[0].id}
                />
              ) : (
                course.reviews.map((reviewsData) => (
                  <Review reviewsData={reviewsData} key={reviewsData.id} />
                ))
              )}
              {course.reviews.length > 1 && (
                <button
                  onClick={() => {
                    setShowAllReviews(!showAllReviews);
                  }}
                  className="self-center px-6 py-3 text-center text-stone-500 underline duration-150 hover:text-black"
                >
                  {showAllReviews
                    ? `Show more reviews (${course.reviews.length - 1})`
                    : "Show less reviews"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </section>
  );
};
