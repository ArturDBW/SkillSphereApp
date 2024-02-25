import logo from "../../public/logo.png";

export const Header = () => {
  return (
    <header className="mx-auto flex max-w-screen-2xl items-center justify-between py-4">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="logo" className="h-10" />
        <span>SkillSphere</span>
      </div>
      <ul className="flex space-x-10">
        <li>Home</li>
        <li>Courses</li>
        <li>About Us</li>
      </ul>
      <div>
        <span>BS</span>
        <button>Sing Up</button>
      </div>
    </header>
  );
};
