import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NotificationPopup } from "../common/NotificationPopup";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">

      <NotificationPopup />
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}