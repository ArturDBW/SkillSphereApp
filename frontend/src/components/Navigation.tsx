import { NavLink } from "react-router-dom";

type NavigationProps = {
  textColor: string;
  extraNavStyles?: string;
  extraUlStyles?: string;
  setShowBurgerMenu?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Navigation = ({
  textColor,
  extraNavStyles,
  extraUlStyles,
  setShowBurgerMenu,
}: NavigationProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    if (setShowBurgerMenu) {
      setShowBurgerMenu(false);
    }
  };

  return (
    <nav className={extraNavStyles}>
      <ul className={`flex space-x-10 font-bold uppercase ${extraUlStyles}`}>
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
