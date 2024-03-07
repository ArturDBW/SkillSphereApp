import { StarRatingStatic } from "./StarRatingStatic";

type reviewsDataProps = {
  reviewsData: {
    rating: number;
  };
};

export const Review = ({ reviewsData }: reviewsDataProps) => {
  return (
    <div className="flex gap-x-5 border-b py-6">
      <div>
        <div
          className="h-24 w-24 rounded-xl bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/564x/1f/50/b9/1f50b9d69876f889319c1bbae9a03f4f.jpg')",
          }}
        />
      </div>
      <div className="w-full">
        <div className="flex items-center space-x-4">
          <StarRatingStatic stars={reviewsData.rating} size={16} />
          <span>24.10.2012</span>
        </div>
        <span className="text-lg font-bold">Margaret</span>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sunt
          illo sed delectus accusamus, eaque deserunt sit minima error
          consectetur sapiente asperiores et non eos placeat odio ipsum! Lorem
          ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </div>
    </div>
  );
};
