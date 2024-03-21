import { Navigation } from "./Navigation";

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 px-2 py-10 text-white">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex justify-between">
          <span className="text-2xl font-bold">SkillSphere</span>
          <Navigation textColor={"white"} />
        </div>
        <p className="mt-10 w-1/2 text-stone-400">
          Our comprehensive range of courses caters to diverse learning needs,
          ensuring you find the perfect opportunity to enhance your skills and
          knowledge. Join us today and embark on a journey of continuous
          learning and growth!
        </p>
        <p className="mt-10 text-stone-400">
          Copyright 2024. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
