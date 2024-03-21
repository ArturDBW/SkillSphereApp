import { Link } from "react-router-dom";
import hero from "/hero.avif";

export const Home = () => {
  return (
    <section
      className="relative flex h-[calc(100vh-72px)] items-center bg-cover bg-center px-2 "
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      <div className="bg-blackCustom absolute left-0 top-0 h-full w-full">
        <div className="mx-auto h-full max-w-screen-xl p-2">
          <div className="flex h-full w-2/3 flex-col items-start justify-center max-lg:w-full">
            <h1 className="text-7xl font-bold text-white max-sm:text-3xl">
              Upgrade your <span className="text-yellow-500">skills</span> and
              knowledge with our online
              <span className="text-yellow-500"> courses.</span>
            </h1>
            <p className="mt-4  text-xl text-stone-200 max-sm:text-base">
              Welcome to our platform! Discover an extensive range of online
              courses designed to suit various interests and skill levels.
              Explore our diverse selection and enhance your knowledge
              conveniently from anywhere. With our user-friendly interface and
              expertly curated content, learning has never been easier. Join our
              community of lifelong learners today!
            </p>
            <Link
              to="/courses"
              className="mt-10 justify-self-start rounded-full bg-yellow-500 px-8 py-4 uppercase duration-150 hover:bg-yellow-400"
            >
              Show Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
