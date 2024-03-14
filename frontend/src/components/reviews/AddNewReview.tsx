import { useState } from "react";
import { StarRating } from "./StarRating";
import { IoClose } from "react-icons/io5";

export const AddNewReview = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  console.log(rating);
  return (
    <div className="absolute left-0 top-0 h-screen w-screen bg-black bg-opacity-5">
      <div className="absolute bottom-1/2 right-1/2 flex translate-x-1/2 translate-y-1/2 flex-col items-center rounded-xl bg-white p-5">
        <h2 className="mb-5 text-4xl font-bold">What is your review? </h2>
        <StarRating size={56} onRatingChange={handleRatingChange} />
        <form className="flex flex-col items-center">
          <textarea
            placeholder="Tell us about your impressions of the course."
            className="mt-5 h-36 min-w-[600px] border border-black p-2"
          ></textarea>
          <button
            type="submit"
            className="mt-8 w-40 self-end rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
          >
            Save
          </button>
        </form>
        <IoClose
          size={28}
          className="absolute right-1 top-1 cursor-pointer text-stone-400 duration-150 hover:text-black"
        />
      </div>
    </div>
  );
};
