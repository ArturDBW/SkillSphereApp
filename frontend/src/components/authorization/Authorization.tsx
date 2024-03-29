import { useCallback, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import hero from "/hero.avif";
import { Login } from "./Login";
import { SignUp } from "./SingUp";

type AuthorizationPros = {
  showAuthorization: boolean;
  setShowAuthorization: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Authorization = ({
  showAuthorization,
  setShowAuthorization,
}: AuthorizationPros) => {
  const [showLogin, setShowLogin] = useState(true);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAuthorization(false);
      }
    },
    [setShowAuthorization],
  );

  useEffect(() => {
    if (showAuthorization) {
      document.addEventListener("keydown", handleKeyPress);
    } else {
      document.removeEventListener("keydown", handleKeyPress);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showAuthorization, handleKeyPress]);

  return (
    <div
      onClick={() => {
        setShowAuthorization(false);
      }}
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 px-2"
    >
      <div
        onClick={(e) => {
          stopPropagation(e);
        }}
        className="mx-auto flex h-[500px] w-full max-w-4xl rounded-xl bg-white"
      >
        <div className="relative flex w-2/3 flex-col items-center justify-center overflow-hidden max-sm:w-full">
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="absolute bottom-5 right-5 hidden text-lg duration-150 hover:text-yellow-500 hover:underline max-sm:block"
          >
            {showLogin ? "You wanna create account?" : "You have account?"}
          </button>
          <div
            className={`absolute transition-transform duration-500 ease-in-out ${showLogin ? `translate-y-0` : `translate-y-[140%]`}`}
          >
            <Login />
          </div>
          <div
            className={`absolute transition-transform duration-500 ease-in-out ${showLogin ? `-translate-y-[140%]` : `translate-y-0`}`}
          >
            <SignUp />
          </div>
        </div>
        <div
          className="relative w-1/3 rounded-r-xl bg-cover bg-center bg-no-repeat text-center text-white max-sm:hidden"
          style={{
            backgroundImage: `url(${hero})`,
          }}
        >
          <div
            className="flex h-full w-full flex-col items-center justify-center rounded-r-xl px-2"
            style={{ backgroundColor: "rgba(102, 78, 36, 0.5)" }}
          >
            <IoIosCloseCircleOutline
              onClick={() => {
                setShowAuthorization(!showAuthorization);
              }}
              size={36}
              className="absolute right-1 top-1 cursor-pointer"
            />
            <h3 className="text-3xl font-bold">
              {showLogin ? "New Here?" : "You have account?"}
            </h3>
            <p className="text-lg">
              Start looking for the best courses for your self-development!"
            </p>
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="mt-6 w-28 rounded-full border-2 py-3 font-bold duration-150 hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
            >
              {showLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
