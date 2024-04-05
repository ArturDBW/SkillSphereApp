import { backendURL } from "../../utils/api";
import { StarRatingStatic } from "./StarRatingStatic";

type reviewsDataProps = {
  reviewsData: {
    rating: number;
    review: string;
    user: {
      name: string;
      imageCover: string;
    };
  };
};

export const Review = ({ reviewsData }: reviewsDataProps) => {
  return (
    <div className="flex gap-x-5 border-b py-6">
      <div>
        <div
          className="h-24 w-24 rounded-xl bg-cover bg-center"
          style={{
            backgroundImage: `url('${backendURL}/public/${reviewsData.user.imageCover}')`,
          }}
        />
      </div>
      <div className="w-full">
        <div className="flex items-center space-x-4">
          <StarRatingStatic stars={reviewsData.rating} size={16} />
          <span>24.10.2012</span>
        </div>
        <span className="text-lg font-bold">{reviewsData.user.name}</span>
        <div>{reviewsData.review}</div>
      </div>
    </div>
  );
};
