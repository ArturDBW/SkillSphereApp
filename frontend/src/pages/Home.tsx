import ddd from "/ddd.avif";

export const Home = () => {
  return (
    <div>
      <section className="grid h-[calc(100vh-72px)] grid-cols-5 grid-rows-7 gap-10">
        <div className="x col-span-2 row-start-2 row-end-6 grid grid-cols-1">
          <div>
            <h1 className="text-6xl">
              Upgrade your <span className="text-yellow-500">skills</span> and
              knowledge with our online
              <span className="text-yellow-500"> course.</span>
            </h1>
            <p className="mt-4 text-lg text-stone-500">
              Our platform offers a diverse range of online courses, catering to
              various interests and skill levels. Explore our comprehensive
              selection of courses to enhance your knowledge and skills
              conveniently from anywhere.
            </p>
          </div>
          <button className="self-end justify-self-start rounded-full bg-yellow-500 px-8 py-4 uppercase duration-150 hover:bg-yellow-400">
            Show Courses
          </button>
        </div>
        <div className="col-span-3 row-start-2 row-end-6 bg-blue-50">
          <img src={ddd} alt="dd" className="h-full w-full rounded-lg" />
        </div>
      </section>
    </div>
  );
};
