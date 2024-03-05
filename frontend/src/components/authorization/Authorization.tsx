import { useCallback, useEffect, useState } from "react";
import { Login } from "./Login";
import { SignUp } from "./SingUp";
import { IoIosCloseCircleOutline } from "react-icons/io";

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
      className="absolute left-0 top-0 h-screen w-screen bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => {
          stopPropagation(e);
        }}
        className="absolute bottom-1/2 right-1/2 mx-auto flex h-[500px] w-full max-w-4xl translate-x-1/2 translate-y-1/2 border bg-white"
      >
        <div className="relative flex w-2/3 flex-col items-center justify-center overflow-hidden">
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
        <div className="relative flex w-1/3 flex-col items-center justify-center bg-blue-400 px-2 text-center text-white">
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
            className="mt-6 w-28 rounded-full bg-white py-3 font-bold text-black duration-150 hover:text-blue-400"
          >
            {showLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};
