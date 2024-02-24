import { useState } from "react";
import { API } from "../utils/api";
import { AxiosError } from "axios";

export const LoginTest = () => {
  const inputStyled = `mx-auto min-w-80 rounded-full  bg-sky-100 px-6 py-2 outline-none mb-4`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await API.post("/skillsphere/users/login", {
        email,
        password,
      });
      console.log("Zalogowano pomyslnie");
      console.log(response);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data.message);
      }
      setIsError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className=" text-center text-4xl font-bold">
        Nice to see you again!
      </h2>
      <span className="mb-10 mt-2 text-lg text-stone-400">
        Login to your account
      </span>
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsError(false);
          }}
          className={inputStyled}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setIsError(false);
          }}
          className={inputStyled}
        />
        <div className="mb-1 mt-[-12px] h-5 w-full px-1 text-red-500">
          {isError ? errorMessage : null}
        </div>
        <div className="mt-2 flex w-full justify-between px-1">
          <span>Remember me</span>
          <span className="text-blue-500 underline">Forgot your password?</span>
        </div>
        <button
          type="submit"
          className="mt-8 rounded-full bg-blue-400 px-10 py-3 font-bold text-white duration-150 hover:bg-blue-500"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

// const logout = async () => {
//   try {
//     const response = await API.get("/skillsphere/users/logout");
//     console.log(response);
//     if (response.data.status === "success") location.reload();
//   } catch (err) {
//     console.error("Bład wylogowania", err);
//   }
// };
