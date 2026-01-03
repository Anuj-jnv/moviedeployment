import { Link } from "react-router-dom";
import { MdOutlineLocalMovies, MdEmail, MdPhone } from "react-icons/md";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-[#1E293B] mt-10">
      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

        {/* BRAND */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white text-xl font-bold">
            <MdOutlineLocalMovies size={22} />
            MovieHub
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            A modern movie discovery platform built with the MERN stack
            and RTK Query, focused on performance and a clean cinematic UI.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold tracking-wide">
            Quick Links
          </h4>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-teal-400 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="hover:text-teal-400 transition"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-teal-400 transition"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* CONNECT */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold tracking-wide">
            Connect
          </h4>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/moviehub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="
                p-2.5 rounded-full
                bg-gray-800 border border-gray-700
                text-gray-400
                hover:text-white hover:bg-gray-700 hover:border-gray-500
                transition-all
              "
            >
              <FaGithub size={18} />
            </a>

            <a
              href="https://linkedin.com/in/moviehub123"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="
                p-2.5 rounded-full
                bg-gray-800 border border-gray-700
                text-gray-400
                hover:text-white hover:bg-gray-700 hover:border-gray-500
                transition-all
              "
            >
              <FaLinkedin size={18} />
            </a>
          </div>

          {/* Contact */}
          <div className="space-y-2 text-sm text-gray-400">
            <a
              href="mailto:moviehub@email.com"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <MdEmail size={16} />
              moviehub@email.com
            </a>

            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <MdPhone size={16} />
              +91 98765 43210
            </a>
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
