import { useEffect, useState } from "react";
import { API } from "./utils/api";
import { Login } from "./components/Login";
import { ChangePassword } from "./components/ChangePassword";

type Course = {
  title: string;
  _id: number;
};

export const App = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await API.get("/skillsphere/courses");
      setCourses(response.data.data.courses);
      console.log(course);
    } catch (err) {
      console.error("Bład podczas pobierania danych", err);
    }
  };

  const fetchOneCourse = async (id: string) => {
    try {
      const response = await API.get(`/skillsphere/courses/${id}`);
      setCourse(response.data.data.courses); // Ustawienie danych pojedynczego kursu
      console.log(response.data.data.course); // obiekt tu jest trzba poprawic na array
    } catch (err) {
      console.error("Błąd podczas pobierania danych kursu", err);
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

  const updateCourse = async (id: string) => {
    try {
      await API.patch(`/skillsphere/courses/${id}`, {
        title: "Update kursu",
        price: 1000,
      });
      console.log("Kurs został pomyślnie zaktualizowany");
      fetchCourses();
    } catch (err) {
      console.error("Błąd podczas aktualizowania kursu", err);
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
      <button
        onClick={() => {
          updateCourse("65cf98f4f1d8b00e185e19a5");
        }}
      >
        Update Course
      </button>
      <button
        onClick={() => {
          fetchOneCourse("65bcf8c18d51d25f3524952d");
        }}
      >
        Fetch One Course
      </button>
      <Login />
      <ChangePassword />
    </div>
  );
};
