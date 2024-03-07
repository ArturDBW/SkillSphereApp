import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { API } from "../utils/api";

export const AppLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginAndFetchUser = async () => {
      try {
        const loginResponse = await API.get("/checkLogin", {
          withCredentials: true,
        });
        console.log("Autoryzacja okej");
        const userId = loginResponse.data.currentUser.id;

        const userResponse = await API.get(`/skillsphere/users/${userId}`);
        setUser(userResponse.data.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    checkLoginAndFetchUser();
  }, []);

  return (
    <>
      <Header user={user} />
      <main className="mx-auto max-w-screen-xl">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
