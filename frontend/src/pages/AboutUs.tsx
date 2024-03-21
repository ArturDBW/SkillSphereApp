import { useEffect, useState } from "react";
import { API } from "../utils/api";
import aboutUsPhoto from "/aboutUsPhoto.jpg";
import { useSpring, animated } from "react-spring";

export const AboutUs = () => {
  const [coursesQuantity, setCoursesQuantity] = useState(0);
  const [usersQuantity, setUsersQuantity] = useState(0);
  const [reviewsQuantity, setReviewsQuantity] = useState(0);

  const coursesSpring = useSpring({
    number: coursesQuantity,
    config: { duration: 500 },
  });
  const usersSpring = useSpring({
    number: usersQuantity,
    config: { duration: 500 },
  });
  const reviewsSpring = useSpring({
    number: reviewsQuantity,
    config: { duration: 500 },
  });

  useEffect(() => {
    const globalQuantityData = async () => {
      try {
        const [coursesResponse, usersResponse, reviewsResponse] =
          await Promise.all([
            API.get("/skillsphere/courses"),
            API.get("/skillsphere/users"),
            API.get("/skillsphere/reviews"),
          ]);
        setCoursesQuantity(coursesResponse.data.results);
        setUsersQuantity(usersResponse.data.results);
        setReviewsQuantity(reviewsResponse.data.results);
      } catch (err) {
        console.error(err);
      }
    };
    globalQuantityData();
  }, []);

  return (
    <section className="mx-auto mt-10 min-h-[calc(100vh-72px)] max-lg:mt-4 max-sm:min-h-min">
      <div className="mx-auto max-w-screen-xl p-2">
        <div className="flex gap-x-7 max-lg:flex-col">
          <div className="flex w-2/5 flex-col justify-between max-lg:w-full">
            <h2 className="text-6xl font-bold max-xl:text-5xl max-lg:text-6xl max-sm:text-2xl">
              Our dream is global
              <span className="text-yellow-500"> learning</span> transformation.
            </h2>
            <p className="text-lg text-stone-500 max-xl:mt-6 max-xl:text-base max-lg:text-lg max-sm:mt-2 max-sm:text-sm">
              Welcome to SkillSphere, your premier destination for online
              learning. We are dedicated to providing high-quality courses
              designed to empower individuals to achieve their educational goals
              conveniently from anywhere in the world. Our team of experienced
              instructors is committed to delivering engaging and interactive
              content tailored to meet the diverse needs of our learners. Join
              us on a journey of knowledge and skill development, and unlock
              your full potential with SkillSphere. Whether you're looking to
              enhance your career prospects, explore new interests, or simply
              expand your horizons.
            </p>
          </div>
          <div className="w-3/5 max-xl:mt-6 max-lg:w-full">
            <img src={aboutUsPhoto} alt="aboutUsPhoto" className="rounded-xl" />
          </div>
        </div>
        <h2 className="my-10 flex justify-center text-3xl font-bold max-sm:my-5 max-sm:text-xl">
          About us in numbers!
        </h2>
        <div className="flex justify-around max-md:mb-5">
          <div className="flex w-full flex-col items-center">
            <animated.span className="text-7xl text-yellow-500 max-sm:text-5xl">
              {coursesSpring.number.to((value) => Math.floor(value))}
            </animated.span>
            <span className="mt-4 text-sm text-stone-500">Courses</span>
          </div>
          <div className="flex w-full flex-col items-center border-x ">
            <animated.span className="text-7xl text-yellow-500 max-sm:text-5xl">
              {usersSpring.number.to((value) => Math.floor(value))}
            </animated.span>
            <span className="mt-4 text-sm text-stone-500">Users</span>
          </div>
          <div className="flex w-full flex-col items-center">
            <animated.span className="text-7xl text-yellow-500 max-sm:text-5xl">
              {reviewsSpring.number.to((value) => Math.floor(value))}
            </animated.span>
            <span className="mt-4 text-sm text-stone-500">Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};
