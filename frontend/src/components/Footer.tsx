import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 py-10 text-white">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex justify-between">
          <span className="text-2xl font-bold">SkillSphere</span>
          <nav>
            <ul className="flex space-x-10 font-bold">
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#eab308" : "white",
                })}
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                to="/courses"
                style={({ isActive }) => ({
                  color: isActive ? "#eab308" : "white",
                })}
              >
                <li>Courses</li>
              </NavLink>
              <NavLink
                to="/aboutus"
                style={({ isActive }) => ({
                  color: isActive ? "#eab308" : "white",
                })}
              >
                <li>About Us</li>
              </NavLink>
            </ul>
          </nav>
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
