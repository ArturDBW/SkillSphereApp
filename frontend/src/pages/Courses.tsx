import { useEffect, useState } from "react";
import { Course } from "../components/courses/Course";
import { API } from "../utils/api";
import ddd from "/ddd.avif";

type Course = {
  title: string;
  _id: number;
  author: string;
  description: string;
  price: number;
};

export const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get("/skillsphere/courses");
        setCourses(response.data.data.courses);
      } catch (err) {
        console.error("Błąd podczas pobierania danych", err);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    console.log(courses);
  }, [courses]);

  return (
    <div>
      <div
        className="relative my-10 h-[200px] rounded-xl bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${ddd})`,
        }}
      >
        <div className="absolute bottom-1/2 right-1/2 z-10 w-full translate-x-1/2 translate-y-1/2">
          <h2 className="text-center text-6xl text-white">Welcome, Artur!</h2>
          <h3 className="text-center text-lg text-stone-300">
            Lets begin searching courses!
          </h3>
        </div>
        <div className="h-full w-full rounded-xl bg-black opacity-70"></div>
      </div>
      <div className="flex">
        <div className="w-1/4"></div>
        <div className="w-3/4">
          {courses.map((courseData: Course) => (
            <Course key={courseData._id} courseData={courseData} />
          ))}
        </div>
      </div>
    </div>
  );
};
