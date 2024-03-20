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
    <section className="mt-10">
      <div className="flex gap-x-7">
        <div className="flex w-2/5 flex-col">
          <h2 className="mb-7 text-6xl">
            Our dream is global
            <span className="text-yellow-500"> learning</span> transformation.
          </h2>
          <p className="text-lg text-stone-500">
            Welcome to SkillSphere, your premier destination for online
            learning. We are dedicated to providing high-quality courses
            designed to empower individuals to achieve their educational goals
            conveniently from anywhere in the world. Our team of experienced
            instructors is committed to delivering engaging and interactive
            content tailored to meet the diverse needs of our learners. Join us
            on a journey of knowledge and skill development, and unlock your
            full potential with SkillSphere.
          </p>
        </div>
        <div className="w-3/5">
          <img src={aboutUsPhoto} alt="aboutUsPhoto" className="rounded-xl" />
        </div>
      </div>
      <h2 className="my-10 flex justify-center text-3xl font-bold">
        About us in numbers!
      </h2>
      <div className="flex justify-around">
        <div className="flex w-full flex-col items-center">
          <animated.span className="text-7xl text-yellow-500">
            {coursesSpring.number.to((value) => Math.floor(value))}
          </animated.span>
          <span className="mt-4 text-sm text-stone-500">Courses</span>
        </div>
        <div className="flex w-full flex-col items-center border-x">
          <animated.span className="text-7xl text-yellow-500">
            {usersSpring.number.to((value) => Math.floor(value))}
          </animated.span>
          <span className="mt-4 text-sm text-stone-500">Users</span>
        </div>
        <div className="flex w-full flex-col items-center">
          <animated.span className="text-7xl text-yellow-500">
            {reviewsSpring.number.to((value) => Math.floor(value))}
          </animated.span>
          <span className="mt-4 text-sm text-stone-500">Reviews</span>
        </div>
      </div>
    </section>
  );
};
