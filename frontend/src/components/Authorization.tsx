import { useState } from "react";

export const Login = () => {
  const [lol, setLol] = useState(true);

  return (
    <>
      <div className="mx-auto  flex h-[500px] max-w-4xl gap-6 border">
        {lol ? (
          <div className="flex w-2/3 flex-col items-center justify-center">
            <h2 className=" text-center text-4xl font-bold">
              Nice to see you again!
            </h2>
            <span className="mb-10 mt-2 text-lg text-stone-400">
              Login to your account
            </span>

            <form onSubmit={() => {}} className="flex flex-col items-center">
              <div className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="mx-auto min-w-80 rounded-full  bg-sky-100 px-6 py-2 outline-none"
                />
                <input
                  type="text"
                  placeholder="Password"
                  className="mx-auto min-w-80 rounded-full bg-sky-100 px-6 py-2 outline-none"
                />
              </div>
              <div className="mt-2 flex w-full justify-between px-1">
                <span>Remember me</span>
                <span className="text-blue-500 underline">
                  Forgot your password?
                </span>
              </div>
              <button
                type="submit"
                className="mt-8 rounded-full bg-blue-500 px-10 py-2 font-bold text-white"
              >
                Log in
              </button>
            </form>
          </div>
        ) : (
          <div className="w-2/3"></div>
        )}
        <div className="flex w-1/3 flex-col items-center justify-center bg-blue-400 text-center text-white">
          <h3 className="text-3xl font-bold">New Here?</h3>
          <p className="text-lg">
            Sing up and discover a great amount of new apportunites!
          </p>
          <button className="mt-4 rounded-full bg-white px-8 py-2 font-bold text-black">
            Sign Up
          </button>
        </div>
      </div>
      TUTAJ PRZERWA /////////////////
      <div className="mx-auto  flex h-[500px] max-w-4xl gap-6 border">
        {lol ? (
          <div className="flex w-2/3 flex-col items-center justify-center">
            <h2 className=" text-center text-4xl font-bold">Welcome!</h2>
            <span className="mb-10 mt-2 text-lg text-stone-400">
              Create account
            </span>

            <form onSubmit={() => {}} className="flex flex-col items-center">
              <div className="flex flex-col items-center space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="mx-auto min-w-80 rounded-full  bg-sky-100 px-6 py-2 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="mx-auto min-w-80 rounded-full  bg-sky-100 px-6 py-2 outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="mx-auto min-w-80 rounded-full bg-sky-100 px-6 py-2 outline-none"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="mx-auto min-w-80 rounded-full bg-sky-100 px-6 py-2 outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-8 rounded-full bg-blue-500 px-10 py-2 font-bold text-white"
              >
                Sign Up
              </button>
            </form>
          </div>
        ) : (
          <div className="w-2/3"></div>
        )}
        <div className="flex w-1/3 flex-col items-center justify-center bg-blue-400 text-center text-white">
          <h3 className="text-3xl font-bold">New Here?</h3>
          <p className="text-lg">
            Sing up and discover a great amount of new apportunites!
          </p>
          <button className="mt-4 rounded-full bg-white px-8 py-2 text-black">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};
