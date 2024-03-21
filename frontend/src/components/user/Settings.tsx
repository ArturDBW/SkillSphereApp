import { BsPerson } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoLockOpenOutline, IoSettingsOutline } from "react-icons/io5";
import { UpdatePersonalDataForm } from "./UpdatePersonalDataForm";
import { UpdatePasswordForm } from "./UpdatePasswordForm";
import { useState, useContext } from "react";
import { UserContext } from "../../ui/AppLayout";

type UserProps = {
  email: string;
  name: string;
  id: string;
  imageCover?: string;
};

export const Settings = () => {
  const user: UserProps | null = useContext(UserContext);

  const [settingsComponent, setSettingComponent] = useState("PersonalData");
  const liStyled = `m-2 flex cursor-pointer items-center space-x-2 rounded-xl px-4 py-6 duration-150 hover:bg-yellow-500 hover:text-white`;

  return (
    <section className="flex h-[calc(100vh-72px)] gap-x-4">
      <div className="w-1/3 border text-2xl text-black">
        <div className="m-2 flex items-center space-x-2 border-b px-4 py-6">
          <IoSettingsOutline />
          <span>Settings</span>
        </div>
        <ul>
          <li
            onClick={() => {
              setSettingComponent("PersonalData");
            }}
            className={`${liStyled} ${settingsComponent === "PersonalData" ? "bg-yellow-500 text-white" : "bg-white text-black"}`}
          >
            <BsPerson />
            <span>Account</span>
            <MdKeyboardArrowRight className="self-end" />
          </li>
          <li
            onClick={() => {
              setSettingComponent("Security");
            }}
            className={`${liStyled} ${settingsComponent === "Security" ? "bg-yellow-500 text-white" : "bg-white text-black"}`}
          >
            <IoLockOpenOutline />
            <span>Security</span>
            <MdKeyboardArrowRight className="self-end" />
          </li>
        </ul>
      </div>
      <div className="flex w-2/3 flex-col border p-4">
        <div className="flex space-x-4 border-b pb-4">
          <div
            className="h-28 w-28 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${user?.imageCover ? user.imageCover : "https://i.pinimg.com/564x/1f/50/b9/1f50b9d69876f889319c1bbae9a03f4f.jpg"})`,
            }}
          />
          <div className="flex flex-col justify-center">
            <span className="text-lg font-bold">{user?.name}</span>
            <span className="text-stone-500">{user?.email}</span>
            <span className="text-sm text-stone-500">User</span>
          </div>
        </div>
        {settingsComponent === "PersonalData" && <UpdatePersonalDataForm />}
        {settingsComponent === "Security" && <UpdatePasswordForm />}
      </div>
    </section>
  );
};
