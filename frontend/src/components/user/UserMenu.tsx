import { IoSettingsOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { API } from "../../utils/api";

export const UserMenu = () => {
  const liStyled =
    "flex cursor-pointer items-center space-x-2 border-b py-5 hover:text-yellow-500";

  const logout = async () => {
    try {
      const response = await API.get("/skillsphere/users/logout");
      console.log(response);
      if (response.data.status === "success") location.reload();
    } catch (err) {
      console.error("Bład wylogowania", err);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div
        className="h-10 w-10 rounded-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/564x/1f/50/b9/1f50b9d69876f889319c1bbae9a03f4f.jpg')",
        }}
      />
      <div className="absolute right-0 top-0 translate-y-12 border bg-white px-4 shadow-lg">
        <div className="flex items-center space-x-4 border-b py-3">
          <div
            className="h-16 w-16 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/564x/1f/50/b9/1f50b9d69876f889319c1bbae9a03f4f.jpg')",
            }}
          />
          <div className="flex flex-col">
            <span>Marcelina</span>
            <span className="text-sm text-stone-500">User</span>
          </div>
        </div>
        <ul className="font-bold">
          <li className={liStyled}>
            <IoSettingsOutline size={22} />
            <span>Settings</span>
          </li>
          <li className={liStyled}>
            <IoCreateOutline size={22} />
            <span>My courses</span>
          </li>
          <li onClick={logout} className={liStyled}>
            <CiLogout size={22} />
            <span>Log out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
