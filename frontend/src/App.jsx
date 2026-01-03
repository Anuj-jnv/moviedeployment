import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <Layout>
      {/* Global Toast Container (ONLY ONCE) */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="bg-gray-900 text-white border border-gray-700 rounded-lg"
        bodyClassName="text-sm font-medium"
        progressClassName="bg-teal-500"
      />

      <Navbar />

      <main className="min-h-[calc(100vh-160px)] pt-20 px-4">
        <Outlet />
      </main>

      <Footer />
    </Layout>
  );
};

export default App;
