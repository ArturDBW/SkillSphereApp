import { useState } from "react";
import { API } from "../utils/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/skillsphere/users/login", {
        email,
        password,
      });
      console.log("Zalogowano pomyslnie");
      console.log(response);
    } catch (err) {
      console.error("Błąd logowania", err);
    }
    console.log(email, password);
  };

  return (
    <form>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleLogin}>Zaloguj</button>
    </form>
  );
};
