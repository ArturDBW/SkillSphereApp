import { useState } from "react";
import { API } from "../../utils/api";

export const Signup = () => {
  const inputStyled = `mx-auto min-w-80 rounded-full  bg-sky-100 px-6 py-2 outline-none mb-4`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateAccount = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await API.post("/skillsphere/users/signup", {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      });
      console.log("Konto zostalo utworzone pomyslnie");
      console.log(response);
    } catch (err) {
      console.error("Błąd podczas zakladania konta", console.error());
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h2 className=" text-center text-4xl font-bold">Welcome!</h2>
      <span className="mb-10 mt-2 text-lg text-stone-400">Create account</span>
      <form
        onSubmit={handleCreateAccount}
        className="flex flex-col items-center"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputStyled}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputStyled}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={inputStyled}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className={inputStyled}
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="mt-8 rounded-full bg-blue-400 px-10 py-3 font-bold text-white duration-150 hover:bg-blue-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
