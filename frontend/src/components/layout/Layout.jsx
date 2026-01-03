import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const { pathname } = useLocation();

  // Pages that need full poster background
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col bg-[#020617]">
      <Navbar />
       
      {/* MAIN CONTENT */}
      <main
        className={`flex-grow flex flex-col ${
          isAuthPage ? "relative" : "max-w-7xl mx-auto w-full px-6 py-6"
        }`}
      >
        <Outlet />
      </main>

      {/* FOOTER */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;
