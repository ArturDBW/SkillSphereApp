import { useEffect, useState } from "react";
import { Course } from "../components/courses/Course";
import { API } from "../utils/api";
import hero from "/hero.avif";
import Select from "react-select";
import { sortingStyles } from "../utils/sortingStyles";

type Course = {
  title: string;
  id: number;
  author: string;
  description: string;
  price: number;
};

const options = [
  { value: "createdAt", label: "Latest" },
  { value: "-createdAt", label: "Newest" },
  { value: "price", label: "Price" },
];

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [sortOption, setSortOption] = useState(options[0]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get(
          `/skillsphere/courses?sort=${sortOption.value}`,
        );
        setCourses(response.data.data.courses);
      } catch (err) {
        console.error("Błąd podczas pobierania danych", err);
      }
    };

    fetchCourses();
  }, [sortOption]);

  return (
    <div>
      <div
        className="relative my-10 h-[200px] rounded-xl bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        <div className="absolute bottom-1/2 right-1/2 z-10 w-full translate-x-1/2 translate-y-1/2">
          <h2 className="text-center text-6xl text-white">Welcome, Artur!</h2>
          <h3 className="text-center text-lg text-stone-300">
            Let's begin looking for courses!
          </h3>
        </div>
        <div className="h-full w-full rounded-xl bg-black opacity-70"></div>
      </div>
      <div className="flex gap-x-4">
        <div className="w-1/4 py-2">
          <Select
            defaultValue={sortOption}
            onChange={(selectedOption) =>
              selectedOption && setSortOption(selectedOption)
            }
            options={options}
            styles={sortingStyles}
          />
        </div>
        <div className="w-3/4">
          {courses.map((courseData: Course) => (
            <Course key={courseData.id} courseData={courseData} />
          ))}
        </div>
      </div>
    </div>
  );
};
