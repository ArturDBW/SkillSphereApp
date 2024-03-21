import { NavLink } from "react-router-dom";

type NavigationProps = {
  textColor: string;
};

export const Navigation = ({ textColor }: NavigationProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  return (
    <nav>
      <ul className="flex space-x-10 font-bold">
        <NavLink
          to="/"
          onClick={scrollToTop}
          style={({ isActive }) => ({
            color: isActive ? "#eab308" : textColor,
          })}
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          to="/courses"
          onClick={scrollToTop}
          style={({ isActive }) => ({
            color: isActive ? "#eab308" : textColor,
          })}
        >
          <li>Courses</li>
        </NavLink>
        <NavLink
          to="/aboutus"
          onClick={scrollToTop}
          style={({ isActive }) => ({
            color: isActive ? "#eab308" : textColor,
          })}
        >
          <li>About Us</li>
        </NavLink>
      </ul>
    </nav>
  );
};
