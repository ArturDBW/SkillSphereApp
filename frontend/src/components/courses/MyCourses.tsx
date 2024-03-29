import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { BsBook } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GrNewWindow } from "react-icons/gr";
import { AddNewCourse } from "./AddNewCourse";
import { BoughtCourses } from "./BoughtCourses";

export const MyCourses = () => {
  const [settingsComponent, setSettingComponent] = useState("boughtCourses");
  const liStyled = `m-2 flex cursor-pointer items-center space-x-2 rounded-xl px-4 py-6 duration-150 hover:bg-yellow-500 hover:text-white max-sm:w-full max-sm:justify-center`;

  return (
    <section className="min-h-[calc(100vh-72px)]">
      <div className="mx-auto flex max-w-screen-xl gap-x-4 px-2 ">
        <div className="w-1/3 border text-2xl text-black max-sm:w-1/5">
          <div className="m-2 flex items-center space-x-2 border-b px-4 py-6 max-sm:flex-col">
            <IoCreateOutline />
            <span className="max-sm:hidden">MyCourses</span>
          </div>
          <ul className="max-sm:flex max-sm:flex-col max-sm:items-center">
            <li
              onClick={() => {
                setSettingComponent("boughtCourses");
              }}
              className={`${liStyled} ${settingsComponent === "boughtCourses" ? "bg-yellow-500 text-white" : "bg-white text-black"}`}
            >
              <BsBook />
              <span className="max-sm:hidden">Courses</span>
              <MdKeyboardArrowRight className="self-end max-sm:hidden" />
            </li>
            <li
              onClick={() => {
                setSettingComponent("newCourse");
              }}
              className={`${liStyled} ${settingsComponent === "newCourse" ? "bg-yellow-500 text-white" : "bg-white text-black"}`}
            >
              <GrNewWindow />
              <span className="max-sm:hidden">Add new course</span>
              <MdKeyboardArrowRight className="self-end max-sm:hidden" />
            </li>
          </ul>
        </div>
        <div className="w-2/3 border max-sm:w-4/5">
          {settingsComponent === "newCourse" && <AddNewCourse />}
          {settingsComponent === "boughtCourses" && <BoughtCourses />}
        </div>
      </div>
    </section>
  );
};
