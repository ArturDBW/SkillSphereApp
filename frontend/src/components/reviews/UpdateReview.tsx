import { IoClose } from "react-icons/io5";
import { StarRatingStatic } from "./StarRatingStatic";
import { API } from "../../utils/api";

type UpdateReviewProps = {
  setOpenUpdateReview: (isOpen: boolean) => void;
  updateRatingUI: () => void;
  userData: {
    rating: number;
    review: string;
    id: string;
  };
};

export const UpdateReview = ({
  setOpenUpdateReview,
  userData,
  updateRatingUI,
}: UpdateReviewProps) => {
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

  return (
    <div className="absolute left-0 top-0 h-screen w-screen bg-black bg-opacity-40">
      <div className="absolute bottom-1/2 right-1/2 flex w-[600px] translate-x-1/2 translate-y-1/2 flex-col rounded-xl bg-white p-5">
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
          <button className="rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400">
            Edit review
          </button>
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
