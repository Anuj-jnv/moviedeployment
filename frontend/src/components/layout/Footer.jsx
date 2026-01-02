import { Link } from "react-router-dom";
import { MdOutlineLocalMovies, MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-[#1E293B] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2 text-white text-xl font-bold">
            <MdOutlineLocalMovies size={22} />
            MovieHub
          </div>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            A modern movie discovery platform built with the MERN stack
            and RTK Query, focused on performance and a clean cinematic UI.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/" className="hover:text-teal-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies" className="hover:text-teal-400 transition">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-teal-400 transition">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="text-white font-semibold mb-3">Connect</h4>
          <div className="flex gap-4 text-gray-400">
            <FaGithub className="hover:text-white transition cursor-pointer" />
            <FaLinkedin className="hover:text-white transition cursor-pointer" />
            <MdEmail className="hover:text-white transition cursor-pointer" />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-[#1E293B] py-4">
        <p className="text-center text-gray-500 text-sm flex justify-center items-center gap-1">
          © {new Date().getFullYear()} MovieHub • Built with
          <FaHeart className="text-red-500 mx-1" size={12} />
          MERN Stack
        </p>
      </div>
    </footer>
  );
};

export default Footer;
