import { Link, NavLink } from "react-router-dom";
import logo from "/logo.png";
import { BsBasket3 } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Authorization } from "./authorization/Authorization";
import { UserMenu } from "./user/UserMenu";

export const Header = ({ user }) => {
  const [showAuthorization, setShowAuthorization] = useState(false);

  useEffect(() => {
    if (showAuthorization) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showAuthorization]);

  return (
    <>
      <header className="relative mx-auto flex max-w-screen-xl items-center justify-between py-4">
        <Link to="/">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="logo" className="h-10" />
            <span>SkillSphere</span>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-10 font-bold">
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "#eab308" : "black",
              })}
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/courses"
              style={({ isActive }) => ({
                color: isActive ? "#eab308" : "black",
              })}
            >
              <li>Courses</li>
            </NavLink>
            <NavLink
              to="/aboutus"
              style={({ isActive }) => ({
                color: isActive ? "#eab308" : "black",
              })}
            >
              <li>About Us</li>
            </NavLink>
          </ul>
        </nav>
        <div className="relative flex items-center space-x-4">
          <BsBasket3
            size={18}
            className="cursor-pointer duration-150 hover:text-yellow-500"
          />
          {user ? (
            <UserMenu />
          ) : (
            <button
              onClick={() => setShowAuthorization(!showAuthorization)}
              className="rounded-full border-2 border-[#eab308] px-5 py-2 font-bold duration-150 hover:bg-yellow-500 hover:text-white"
            >
              Sing Up
            </button>
          )}
        </div>
      </header>
      {showAuthorization && (
        <Authorization
          showAuthorization={showAuthorization}
          setShowAuthorization={setShowAuthorization}
        />
      )}
    </>
  );
};
