import { Link } from "react-router-dom";
import ddd from "/ddd.avif";
import { StarRating } from "../components/reviews/StarRating";

export const Home = () => {
  return (
    <section className="grid h-[calc(100vh-72px)] grid-cols-5 grid-rows-7 gap-5">
      <StarRating />
      <div className="x col-span-2 row-start-2 row-end-6 grid grid-cols-1">
        <div>
          <h1 className="text-6xl">
            Upgrade your <span className="text-yellow-500">skills</span> and
            knowledge with our online
            <span className="text-yellow-500"> courses.</span>
          </h1>
          <p className="mt-4 text-lg text-stone-500">
            Our platform offers a diverse range of online courses, catering to
            various interests and skill levels. Explore our comprehensive
            selection of courses to enhance your knowledge and skills
            conveniently from anywhere.
          </p>
        </div>
        <Link
          to="/courses"
          className="self-end justify-self-start rounded-full bg-yellow-500 px-8 py-4 uppercase duration-150 hover:bg-yellow-400"
        >
          Show Courses
        </Link>
      </div>
      <div className="col-span-3 row-start-2 row-end-6 bg-blue-50">
        <img src={ddd} alt="dd" className="h-full w-full rounded-lg" />
      </div>
    </section>
  );
};
