import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../utils/api";

export const CourseDetails = () => {
  const { id } = useParams(); // Pobierz identyfikator kursu z adresu URL
  const [course, setCourse] = useState(null); // Stan do przechowywania danych kursu

  useEffect(() => {
    const fetchOneCourse = async (id) => {
      try {
        const response = await API.get(`/skillsphere/courses/${id}`);
        console.log(response.data.data);
        setCourse(response.data.data.course); // Ustaw dane kursu w stanie
      } catch (err) {
        console.error("Błąd podczas pobierania danych kursu", err);
      }
    };

    fetchOneCourse(id);
  }, [id]); // Dodaj `id` do zależności, aby wywołać efekt przy zmianie `id`

  return <div>{course?.title}</div>;
};
