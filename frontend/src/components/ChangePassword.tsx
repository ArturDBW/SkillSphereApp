import { useState } from "react";
import { API } from "../utils/api";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Nowe hasło i jego potwierdzenie nie są zgodne");
    }

    try {
      const response = await API.patch("/skillsphere/users/updateMyPassword", {
        passwordCurrent: currentPassword,
        password: newPassword,
        passwordConfirm: confirmPassword,
      });
      console.log(response);
    } catch (err) {
      console.error("Błąd aktualizacji hasła", err);
      setError("Błąd aktualizacji hasła. Spróbuj ponownie");
    }
  };

  return (
    <form onSubmit={handleChangePassword}>
      <div>
        <label>Aktualne hasło:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Nowe hasło:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Potwierdź nowe hasło:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Zmień hasło</button>
    </form>
  );
};
