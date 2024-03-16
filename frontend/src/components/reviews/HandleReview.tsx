import { IoClose } from "react-icons/io5";
import { StarRatingStatic } from "./StarRatingStatic";
import { API } from "../../utils/api";
import { useState } from "react";
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
  const [showUpdateReview, setShowUpdateReview] = useState(true);

  console.log(userData);

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

  // ------------------------------------------------------------------------>

  const updateReview = async (reviewId: string) => {
    try {
      const response = await API.patch(`/skillsphere/reviews/${reviewId}`, {
        rating: 3,
        review: "Updateeeee!",
      });
      console.log(response, "Update komentarzu!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onClick={() => setOpenUpdateReview(false)}
      className="absolute left-0 top-0 h-screen w-screen bg-black bg-opacity-40"
    >
      <div
        onClick={(e) => {
          stopPropagation(e);
        }}
        className="absolute bottom-1/2 right-1/2 flex w-[600px] translate-x-1/2 translate-y-1/2 flex-col rounded-xl bg-white p-5"
      >
        <h2 className="mb-3 text-xl font-bold">
          {showUpdateReview ? "Edit review" : "Your review"}
        </h2>
        {showUpdateReview ? (
          <StarRating size={20} stars={3} />
        ) : (
          <StarRatingStatic size={20} stars={userData.rating} />
        )}
        {showUpdateReview ? (
          <textarea className="mt-3 border-2 border-black" />
        ) : (
          <p className="mt-3">{userData?.review}</p>
        )}
        <div className="mt-6 flex justify-end space-x-2">
          {showUpdateReview ? (
            <button
              onClick={() => updateReview(userData.id)}
              className="rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
            >
              Save
            </button>
          ) : (
            <>
              <button
                onClick={() => deleteReview(userData.id)}
                className="rounded-xl px-6 py-3 duration-150 hover:text-yellow-500"
              >
                Delete
              </button>
              <button className="rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400">
                Edit review
              </button>
            </>
          )}
        </div>

        <IoClose
          onClick={() => setOpenUpdateReview(false)}
          size={28}
          className="absolute right-1 top-1 cursor-pointer text-stone-400 duration-150 hover:text-black"
        />
      </div>
    </div>
  );
};
