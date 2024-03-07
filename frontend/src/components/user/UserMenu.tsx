import { IoSettingsOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { API } from "../../utils/api";
import { useState } from "react";
import { Link } from "react-router-dom";

export const UserMenu = () => {
  const liStyled =
    "flex cursor-pointer items-center space-x-2 py-5 hover:text-yellow-500";

  const logout = async () => {
    try {
      await API.get("/skillsphere/users/logout");
      window.setTimeout(() => {
        location.assign("/");
      }, 500);
      console.log("Wylogowanie");
    } catch (err) {
      console.error("Bład wylogowania", err);
    }
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <div
        onClick={() => setShowMenu(true)}
        className="h-10 w-10 cursor-pointer rounded-full bg-cover bg-center duration-150 hover:scale-110"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/564x/1f/50/b9/1f50b9d69876f889319c1bbae9a03f4f.jpg')",
        }}
      />
      {showMenu && (
        <div
          onMouseLeave={() => setShowMenu(false)}
          className="absolute right-0 top-0 z-20 translate-y-12 rounded-xl border bg-white px-4 shadow-lg"
        >
          <div className="flex items-center space-x-4 border-b py-3">
            <div
              className="h-16 w-16 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/564x/1f/50/b9/1f50b9d69876f889319c1bbae9a03f4f.jpg')",
              }}
            />
            <div className="flex flex-col">
              <span className="font-bold">Marcelina</span>
              <span className="text-sm text-stone-500">admin@o2.pl</span>
            </div>
          </div>
          <ul
            onClick={() => {
              setShowMenu(false);
            }}
            className="font-bold"
          >
            <Link to={"/settings"}>
              <li className={`${liStyled} border-b`}>
                <IoSettingsOutline size={22} />
                <span>Settings</span>
              </li>
            </Link>
            <li className={`${liStyled} border-b`}>
              <IoCreateOutline size={22} />
              <span>My courses</span>
            </li>
            <li onClick={logout} className={liStyled}>
              <CiLogout size={22} />
              <span>Log out</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
