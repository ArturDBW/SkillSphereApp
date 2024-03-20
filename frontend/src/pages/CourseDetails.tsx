import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../utils/api";
import { Review } from "../components/reviews/Review";
import { StarRatingStatic } from "../components/reviews/StarRatingStatic";

type ReviewData = {
  id: string;
  review: string;
  rating: number;
  createdAt: string;
};

type Course = {
  title: string;
  id: number;
  author: string;
  description: string;
  price: number;
  reviews: ReviewData[];
};

export const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchOneCourse = async (id: string) => {
      try {
        const response = await API.get(`/skillsphere/courses/${id}`);
        console.log(response.data.data);
        setCourse(response.data.data.course);
      } catch (err) {
        console.error("Błąd podczas pobierania danych kursu", err);
      }
    };

    fetchOneCourse(id!);
  }, [id]);

  const calculateAverageRating = useCallback(() => {
    if (!course || !course.reviews || course.reviews.length === 0) return 0;

    const ratings = course.reviews.map((review) => review.rating);
    const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
    const averageRating = totalRating / ratings.length;
    return Math.floor(averageRating + 0.5);
  }, [course]);

  useEffect(() => {
    if (course) {
      const average = calculateAverageRating();
      setAverageRating(average);
    }
  }, [course, calculateAverageRating]);

  return (
    <section className="mt-4 min-h-[calc(100vh-72px)]">
      {course ? (
        <div>
          <div className="flex border-b py-10">
            <div className="w-2/3">
              <h2 className="text-5xl font-bold">{course.title}</h2>
              <p className="mb-2 mt-6 text-xl">{course.description}</p>
              <div className="flex">
                <StarRatingStatic stars={averageRating} size={28} />
                <span className="text-sm text-stone-500">
                  ({course.reviews.length})
                </span>
              </div>
              <span className="text-xl">Bestseller!</span>
              <span className="block">
                Created by: <span>{course.author}</span>
              </span>
              <span>Created at: 16.02.2024</span>
            </div>
            <div className="flex w-1/3 flex-col justify-between">
              <img
                src="https://www.nafrontendzie.pl/assets/featured/podstawy-react.png"
                alt="image"
                className="rounded-xl"
              />
              <div className="text-xl font-bold">{course.price}$ </div>

              <button className="rounded-xl bg-yellow-500 py-3">
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
    </section>
  );
};
