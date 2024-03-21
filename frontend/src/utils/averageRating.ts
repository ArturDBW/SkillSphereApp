type Review = {
  rating: number;
};

type CourseData = {
  title: string;
  id: number;
  author: string;
  description: string;
  price: number;
  reviews: Review[];
};

export const calculateAverageRating = (courseData: CourseData): number => {
  if (!courseData || !courseData.reviews || courseData.reviews.length === 0)
    return 0;

  const ratings = courseData.reviews.map((review) => review.rating);
  const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
  const averageRating = totalRating / ratings.length;
  return Math.floor(averageRating + 0.5);
};
