import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../utils/api";

export const CourseDetails = () => {
  const { id } = useParams(); // Pobierz identyfikator kursu z adresu URL
  const [course, setCourse] = useState(""); // Stan do przechowywania danych kursu

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

  return (
    <section className="mt-4">
      {course ? (
        <div className="flex border-b py-10">
          <div className="w-2/3">
            <h2 className="text-5xl font-bold">
              React - The Complete Guide 2024 (incl. React Router & Redux)
            </h2>
            <p className="my-6 text-xl">
              Dive in and learn React.js from scratch! Learn React, Hooks,
              Redux, React Router, Next.js, Best Practices and way more!
            </p>
            <div>
              <span className="block">Reviews! (25)</span>
              <span>Bestseller!</span>
            </div>
            <span className="block">
              Created by: <span>{course.author}</span>
            </span>
            <span>Stworzony został 16.02.2024</span>
          </div>
          <div className="flex w-1/3 flex-col justify-between">
            <img
              src="https://www.nafrontendzie.pl/assets/featured/podstawy-react.png"
              alt="image"
              className="rounded-xl"
            />
            <div className="text-xl font-bold">$499</div>

            <button className="rounded-xl bg-yellow-500 py-3">
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </section>
  );
};
