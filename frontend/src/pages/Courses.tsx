import { useEffect, useState } from "react";
import { Course } from "../components/courses/Course";
import { API } from "../utils/api";

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
    <section className="flex">
      <div className="w-1/4"></div>
      <div className="w-3/4">
        {courses.map((courseData: Course) => (
          <Course key={courseData._id} courseData={courseData} />
        ))}
      </div>
    </section>
  );
};
