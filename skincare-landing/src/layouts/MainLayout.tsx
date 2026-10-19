import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { BackToTop } from "../components/layout/BackToTop";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-[90px]">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}