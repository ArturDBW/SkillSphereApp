import { useState } from "react";
import { Login } from "./Login";
import { Signup } from "./SignUp";

export const Authorization = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="mx-auto flex h-[500px] max-w-4xl border">
      <div className="relative flex w-2/3 flex-col items-center justify-center overflow-hidden">
        <div
          className={`absolute transition-transform duration-500 ease-in-out ${showLogin ? `translate-y-0` : `translate-y-[140%]`}`}
        >
          <Login />
        </div>
        <div
          className={`absolute transition-transform duration-500 ease-in-out ${showLogin ? `-translate-y-[140%]` : `translate-y-0`}`}
        >
          <Signup />
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center bg-blue-400 px-2 text-center text-white">
        <h3 className="text-3xl font-bold">
          {showLogin ? "New Here?" : "You have account?"}
        </h3>
        <p className="text-lg">
          Start looking for the best courses for your self-development!"
        </p>
        <button
          onClick={() => setShowLogin(!showLogin)}
          className="mt-6 w-28 rounded-full bg-white  py-3 font-bold text-black"
        >
          {showLogin ? "Sign Up" : "Login"}
        </button>
      </div>
    </div>
  );
};
