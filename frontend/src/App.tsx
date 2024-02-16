import { useEffect, useState } from "react";
import { API } from "./utils/api";

type Course = {
  title: string;
  _id: number;
};

export const App = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await API.get("/skillsphere/courses");
      setCourses(response.data.data.courses);
    } catch (err) {
      console.error("Bład podczas pobierania danych", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async () => {
    try {
      const response = await API.post("/skillsphere/courses", {
        title: "Testowy nowy tytuł 6",
        author: "Arturooo",
        price: 123,
      });
      console.log("Nowy kurs został dodany", response);
      fetchCourses();
    } catch (err) {
      console.error("Błąd podczas tworzenia nowego kursu", err);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await API.delete(`/skillsphere/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error("Błąd podczas usuwania kursu", err);
    }
  };

  return (
    <div>
      <ul>
        {courses.map((course: Course) => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
      <button onClick={createCourse}>Dodaj nowy kurs!</button>
      <button
        onClick={() => {
          deleteCourse("65cf92eef1d8b00e185e196e");
        }}
      >
        Delete Course
      </button>
    </div>
  );
};
