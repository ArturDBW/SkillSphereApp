import { useContext, useEffect, useState } from "react";
import { StarRating } from "./StarRating";
import { IoClose } from "react-icons/io5";
import { API } from "../../utils/api";
import { AlertContext, UserContext } from "../../ui/AppLayout";

type AddNewReviewProps = {
  courseId: string;
  openReview: boolean;
  setOpenAddReview: (isOpen: boolean) => void;
  updateRatingUI: () => void;
};

type UserProps = {
  email: string;
  name: string;
  id: string;
};

export const AddNewReview = ({
  courseId,
  setOpenAddReview,
  updateRatingUI,
}: AddNewReviewProps) => {
  const user: UserProps | null = useContext(UserContext);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [ratingError, setRatingError] = useState(false);
  const [reviewError, setReviewError] = useState(false);

  const alertContext = useContext(AlertContext);
  if (!alertContext) {
    throw new Error("AlertContext not provided");
  }
  const { setShowAlert, setAlertInfo } = alertContext;

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenAddReview(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setOpenAddReview]);

  const createReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await API.post("/skillsphere/reviews", {
        user: user?.id,
        course: courseId,
        rating,
        review,
      });
      setAlertInfo("New review has been added");
      setShowAlert(true);
      setOpenAddReview(false);
      updateRatingUI();
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

  return (
    <div
      onClick={() => {
        setOpenAddReview(false);
      }}
      className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40"
    >
      <div
        onClick={(e) => {
          stopPropagation(e);
        }}
        className="flex w-[600px] flex-col items-center rounded-xl bg-white p-5"
      >
        <h2 className="mb-5 text-4xl font-bold max-[480px]:text-3xl">
          What is your review?{" "}
        </h2>
        <StarRating size={56} onRatingChange={handleRatingChange} />
        {ratingError && (
          <span className="mt-2 px-4 text-red-500">Choose the rating!</span>
        )}
        <form
          onSubmit={createReview}
          className="flex w-full flex-col items-center"
        >
          <textarea
            onChange={(e) => setReview(e.target.value)}
            value={review}
            placeholder="Tell us about your impressions of the course."
            className="mt-5 h-36 w-full border border-black p-2 max-sm:h-20 "
          ></textarea>
          {reviewError && (
            <span className="mt-2 px-4 text-red-500">
              Review can not be empty!
            </span>
          )}
          <button
            type="submit"
            className="mt-8 self-end rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
          >
            Save
          </button>
        </form>
        <IoClose
          onClick={() => {
            setOpenAddReview(false);
          }}
          size={28}
          className="absolute right-1 top-1 cursor-pointer text-stone-400 duration-150 hover:text-black"
        />
      </div>
    </div>
  );
};
