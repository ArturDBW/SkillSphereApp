import { useEffect, useState } from "react";
import { Course } from "../components/courses/Course";
import { API } from "../utils/api";
import hero from "/hero.avif";
import Select from "react-select";
import { sortingStyles } from "../utils/sortingStyles";
import ReactPaginate from "react-paginate";
import { GoSearch } from "react-icons/go";

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
  const [courses, setCourses] = useState<Course[]>([]);
  // Sorting state
  const [sortOption, setSortOption] = useState(options[0]);
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  // Pagination state
  const [currentItems, setCurrentItems] = useState<Course[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemPerPage = 5;

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

  // ------------------------------------------------> Pagination

  useEffect(() => {
    const endOffset = itemOffset + itemPerPage;
    setCurrentItems(
      courses
        .filter((course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(itemOffset, endOffset),
    );
    setPageCount(
      Math.ceil(
        courses.filter((course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ).length / itemPerPage,
      ),
    );
  }, [courses, itemOffset, searchTerm]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset =
      (event.selected * itemPerPage) %
      courses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ).length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="h-[calc(100vh-72px)]">
      <div
        className="relative mb-5 mt-10 h-[200px] rounded-xl bg-cover bg-center bg-no-repeat"
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
      <div>
        <div className="flex gap-x-4">
          <div className="w-1/4">
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
            <div className="relative flex justify-between">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search courses..."
                className="h-[38px] w-full rounded-md border border-[#ccc] px-10 outline-none hover:border-yellow-500 focus:border-2 focus:border-yellow-500"
              />
              <GoSearch
                size={22}
                className="absolute left-2 top-2 text-[#ccc]"
              />
              <span className="flex w-32 items-end justify-end text-lg font-bold">
                Results:{" "}
                {
                  courses.filter((course) =>
                    course.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  ).length
                }
              </span>
            </div>
            {currentItems.map((courseData: Course) => (
              <Course key={courseData.id} courseData={courseData} />
            ))}
            <div>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className="mt-6 flex items-center justify-center space-x-4 text-lg"
                containerClassName="bg-red-500"
                pageLinkClassName="hover:text-yellow-400 duration-150"
                activeLinkClassName="text-yellow-500 underline duration-150"
                nextClassName="py-2 px-4 hover:text-yellow-400 active:text-yellow-500 duration-150"
                previousClassName="py-2 px-4 hover:text-yellow-400 active:text-yellow-500 duration-150"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
