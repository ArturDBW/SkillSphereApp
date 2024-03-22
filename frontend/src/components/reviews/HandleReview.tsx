import { IoClose } from "react-icons/io5";
import { StarRatingStatic } from "./StarRatingStatic";
import { API } from "../../utils/api";
import { useEffect, useState } from "react";
import { StarRating } from "./StarRating";

type HandleReviewProps = {
  setOpenUpdateReview: (isOpen: boolean) => void;
  updateRatingUI: () => void;
  userData: {
    rating: number;
    review: string;
    id: string;
  };
};

export const HandleReview = ({
  setOpenUpdateReview,
  userData,
  updateRatingUI,
}: HandleReviewProps) => {
  const [showUpdateReview, setShowUpdateReview] = useState(false);
  const [rating, setRating] = useState(userData.rating);
  const [review, setReview] = useState(userData.review);
  const [ratingError, setRatingError] = useState(false);
  const [reviewError, setReviewError] = useState(false);

  const deleteReview = async (reviewId: string) => {
    try {
      await API.delete(`/skillsphere/reviews/${reviewId}`);
      updateRatingUI();
      setOpenUpdateReview(false);
      console.log("Usunięto review");
    } catch (err) {
      console.error(err);
    }
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowUpdateReview(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setShowUpdateReview]);

  //  update ------------------------------------------------------------------------>

  const updateReview = async (
    reviewId: string,
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      const response = await API.patch(`/skillsphere/reviews/${reviewId}`, {
        rating,
        review,
      });
      updateRatingUI();
      setOpenUpdateReview(false);
      console.log(response, "Update komentarzu!");
    } catch (err) {
      if (rating <= 0) setRatingError(true);
      if (review === "") setReviewError(true);
      console.error(err);
    }
  };

  useEffect(() => {
    if (rating > 0) setRatingError(false);
    if (review) setReviewError(false);
  }, [rating, review]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenUpdateReview(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setOpenUpdateReview]);

  return (
    <div
      onClick={() => setOpenUpdateReview(false)}
      className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40 px-2"
    >
      <div
        onClick={(e) => {
          stopPropagation(e);
        }}
        className="flex w-[600px] flex-col rounded-xl bg-white p-5 max-sm:w-full"
      >
        {showUpdateReview ? (
          <>
            <h2 className="mb-3 text-xl font-bold">Edit review</h2>
            <StarRating
              size={20}
              onRatingChange={handleRatingChange}
              initialRating={userData.rating}
            />
            {ratingError && (
              <span className="mt-2 text-red-500">Choose the rating!</span>
            )}
            <form onSubmit={(e) => updateReview(userData.id, e)}>
              <textarea
                onChange={(e) => setReview(e.target.value)}
                value={review}
                className="mt-3 w-full border border-black  p-2"
              />
              {reviewError && (
                <div className="mt-2 text-red-500">
                  Review can not be empty!
                </div>
              )}
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setShowUpdateReview(false)}
                  className="rounded-xl px-6 py-3 duration-150 hover:text-yellow-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
                >
                  Save
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="mb-3 text-xl font-bold">Your review</h2>
            <StarRatingStatic size={20} stars={userData.rating} />
            <p className="mt-3">{userData?.review}</p>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => deleteReview(userData.id)}
                className="rounded-xl px-6 py-3 duration-150 hover:text-yellow-500"
              >
                Delete
              </button>
              <button
                onClick={() => setShowUpdateReview(true)}
                className="rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
              >
                Edit review
              </button>
            </div>
          </>
        )}

        <IoClose
          onClick={() => setOpenUpdateReview(false)}
          size={28}
          className="absolute right-1 top-1 cursor-pointer text-stone-400 duration-150 hover:text-black"
        />
      </div>
    </div>
  );
};
