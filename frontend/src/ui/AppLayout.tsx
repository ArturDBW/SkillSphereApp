import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-2xl">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
