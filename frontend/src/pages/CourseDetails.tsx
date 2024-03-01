import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../utils/api";
import { Review } from "../components/reviews/Review";
import { StarRatingStatic } from "../components/reviews/StarRatingStatic";

export const CourseDetails = () => {
  const { id } = useParams(); // Pobierz identyfikator kursu z adresu URL
  const [course, setCourse] = useState(null); // Stan do przechowywania danych kursu
  const [showAllReviews, setShowAllReviews] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  console.log(averageRating);

  useEffect(() => {
    const fetchOneCourse = async (id) => {
      try {
        const response = await API.get(`/skillsphere/courses/${id}`);
        console.log(response.data.data);
        setCourse(response.data.data.course); // Ustaw dane kursu w stanie
      } catch (err) {
        console.error("Błąd podczas pobierania danych kursu", err);
      }
    };

    fetchOneCourse(id);
  }, [id]); // Dodaj `id` do zależności, aby wywołać efekt przy zmianie `id`

  const calculateAverageRating = () => {
    if (!course.reviews || course.reviews.length === 0) return 0;

    const ratings = course.reviews.map((review) => review.rating);
    const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
    return totalRating / ratings.length;
  };

  useEffect(() => {
    if (course) {
      const average = calculateAverageRating();
      setAverageRating(average);
    }
  }, [course]);

  return (
    <section className="mt-4">
      {course ? (
        <div>
          <div className="flex border-b py-10">
            <div className="w-2/3">
              <h2 className="text-5xl font-bold">
                React - The Complete Guide 2024 (incl. React Router & Redux)
              </h2>
              <p className="mb-2 mt-6 text-xl">
                Dive in and learn React.js from scratch! Learn React, Hooks,
                Redux, React Router, Next.js, Best Practices and way more!
              </p>
              <div className="flex">
                <StarRatingStatic stars={averageRating} size={28} />
                <span className="text-sm text-stone-500">(25)</span>
              </div>
              <span className="text-xl">Bestseller!</span>
              <span className="block">
                Created by: <span>{course.author}</span>
              </span>
              <span>Stworzony został 16.02.2024</span>
            </div>
            <div className="flex w-1/3 flex-col justify-between">
              <img
                src="https://www.nafrontendzie.pl/assets/featured/podstawy-react.png"
                alt="image"
                className="rounded-xl"
              />
              <div className="text-xl font-bold">$499</div>

              <button className="rounded-xl bg-yellow-500 py-3">
                Add to Cart
              </button>
            </div>
          </div>
          <div className="flex max-w-3xl flex-col">
            <h2 className="mb-6 mt-10 text-4xl font-bold">Reviews</h2>
            {/* Warunkowe renderowanie komponentu Review na podstawie stanu showOnlyOneReview */}
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
