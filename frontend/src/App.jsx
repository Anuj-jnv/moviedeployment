import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />

      <main className="min-h-[calc(100vh-160px)] pt-20 px-4">
        <Outlet />
      </main>

      <Footer />
    </Layout>
  );
};

export default App;
