import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { BsBook } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GrNewWindow } from "react-icons/gr";
import { AddNewCourse } from "./AddNewCourse";
import { BoughtCourses } from "./BoughtCourses";

export const MyCourses = () => {
  const [settingsComponent, setSettingComponent] = useState("boughtCourses");
  const liStyled = `m-2 flex cursor-pointer items-center space-x-2 rounded-xl px-4 py-6 duration-150 hover:bg-yellow-500 hover:text-white`;

  return (
    <section className="flex h-[calc(100vh-72px)] gap-x-4">
      <div className="w-1/3 border text-2xl text-black">
        <div className="m-2 flex items-center space-x-2 border-b px-4 py-6">
          <IoCreateOutline />
          <span>MyCourses</span>
        </div>
        <ul>
          <li
            onClick={() => {
              setSettingComponent("boughtCourses");
            }}
            className={`${liStyled} ${settingsComponent === "boughtCourses" ? "bg-yellow-500 text-white" : "bg-white text-black"}`}
          >
            <BsBook />
            <span>Courses</span>
            <MdKeyboardArrowRight className="self-end" />
          </li>
          <li
            onClick={() => {
              setSettingComponent("newCourse");
            }}
            className={`${liStyled} ${settingsComponent === "newCourse" ? "bg-yellow-500 text-white" : "bg-white text-black"}`}
          >
            <GrNewWindow />
            <span>Add new course</span>
            <MdKeyboardArrowRight className="self-end" />
          </li>
        </ul>
      </div>
      <div className="w-2/3 border">
        {settingsComponent === "newCourse" && <AddNewCourse />}
        {settingsComponent === "boughtCourses" && <BoughtCourses />}
      </div>
    </section>
  );
};
