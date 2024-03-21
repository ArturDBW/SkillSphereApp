import { Link } from "react-router-dom";
import logo from "/logo.png";
import { BsBasket3 } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { Authorization } from "./authorization/Authorization";
import { UserMenu } from "./user/UserMenu";
import { UserContext } from "../ui/AppLayout";
import { Navigation } from "./Navigation";

type UserProps = {
  email: string;
  name: string;
  id: string;
};

export const Header = () => {
  const [showAuthorization, setShowAuthorization] = useState(false);
  const user: UserProps | null = useContext(UserContext);

  useEffect(() => {
    if (showAuthorization) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showAuthorization]);

  return (
    <>
      <header className="relative mx-auto flex max-w-screen-xl items-center justify-between px-2 py-4">
        <Link to="/">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="logo" className="h-10" />
            <span className="text-xl font-bold">SkillSphere</span>
          </div>
        </Link>
        <Navigation textColor={"black"} />
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
