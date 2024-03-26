import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { createContext, useEffect, useState } from "react";
import { API } from "../utils/api";
import { AlertComponent } from "./AlertComponent";

type UserProps = {
  email: string;
  name: string;
  id: string;
};

type AlertContextType = {
  showAlert: boolean;
  setShowAlert: (show: boolean) => void;
  alertInfo: string;
  setAlertInfo: (info: string) => void;
};

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined,
);
export const UserContext = createContext<UserProps | null>(null);

export const AppLayout = () => {
  const [user, setUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState("");

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
    <UserContext.Provider value={user}>
      <AlertContext.Provider
        value={{ showAlert, setShowAlert, alertInfo, setAlertInfo }}
      >
        <Header />
        {showAlert && <AlertComponent alertInfo={alertInfo} />}
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </AlertContext.Provider>
    </UserContext.Provider>
  );
};
