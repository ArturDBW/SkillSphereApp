import { useState } from "react";
import { API } from "../utils/api";

export const SignupTest = () => {
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
    <form onSubmit={handleCreateAccount}>
      <div>
        <label>Imię:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Adres email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Hasło:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Potwierdź hasło:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Załóż konto</button>
    </form>
  );
};
