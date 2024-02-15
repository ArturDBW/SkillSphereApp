import axios from "axios";
import { useEffect, useState } from "react";

const API = axios.create({
  baseURL: "http://127.0.0.1:4000",
});

export const App = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get("/skillsphere/courses");
        setCourses(response.data.data.courses);
        console.log(response.data.data.courses);
      } catch (err) {
        console.error("Bład podczas pobierania danych", err);
      }
    };
    fetchCourses();
    console.log(courses);
  }, []);

  return (
    <div>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};
