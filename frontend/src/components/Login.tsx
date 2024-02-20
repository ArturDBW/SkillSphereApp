import { useState } from "react";
import { API } from "../utils/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.SyntheticEvent) => {
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

  const logout = async () => {
    try {
      const response = await API.get("/skillsphere/users/logout");
      console.log(response);
      if (response.data.status === "success") location.reload();
    } catch (err) {
      console.error("Bład wylogowania", err);
    }
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
      <button onClick={logout}>Wyloguj</button>
    </form>
  );
};
