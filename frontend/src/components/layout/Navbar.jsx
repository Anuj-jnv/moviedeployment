import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineLocalMovies } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../../redux/features/auth/authSlice";
import { useLogoutMutation } from "../../redux/api/users";

const headerVariants = {
  hidden: { y: -80 },
  visible: { y: 0 },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const profileRef = useRef(null);
  const lastScrollY = useRef(0);

  const isAdmin = userInfo?.isAdmin === true;

  /* Scroll Hide / Show */
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Click Outside Dropdown */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ESC Close */
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setProfileOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const logoutHandler = async () => {
    await logoutApiCall().unwrap();
    dispatch(logout());
    setProfileOpen(false);
    navigate("/login");
  };

  const initials = userInfo?.username?.[0]?.toUpperCase() || "U";

  /* ---------- ACTIVE UNDERLINE COMPONENT ---------- */
  const NavItem = ({ to, children, onClick }) => (
    <NavLink to={to} onClick={onClick} className="px-3 py-2 text-base font-medium">
      {({ isActive }) => (
        <span className="relative text-gray-300 hover:text-white">
          <span className={isActive ? "text-teal-400" : ""}>{children}</span>
          {isActive && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-teal-400 rounded-full" />
          )}
        </span>
      )}
    </NavLink>
  );

  return (
    <AnimatePresence>
      {showNav && (
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25 }}
          className="fixed top-0 inset-x-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-[#1E293B]"
        >
          <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* BRAND */}
            <Link
              to={isAdmin ? "/admin/dashboard" : "/"}
              className="flex items-center gap-2 text-white text-2xl font-bold"
            >
              <MdOutlineLocalMovies size={26} />
              MovieHub
            </Link>

            {/* SEARCH - REMOVED */}

            {/* LINKS (DESKTOP) */}
            <div className="hidden md:flex gap-6">
              {!isAdmin && (
                <>
                  <NavItem to="/">Home</NavItem>
                  <NavItem to="/movies">Movies</NavItem>
                </>
              )}
              {isAdmin && (
                <>
                  
                  <NavItem to="/admin/movies/dashboard">Dashboard</NavItem>
                </>
              )}
            </div>

            {/* RIGHT */}
            <div className="relative flex items-center gap-4">
              {userInfo ? (
                <div ref={profileRef} className="relative hidden md:block">
                  <button
                    onClick={() => setProfileOpen((p) => !p)}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full
                               bg-[#0F172A] border border-[#1E293B]
                               hover:border-teal-400 transition"
                  >
                    <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold">
                      {initials}
                    </div>
                    <span className="text-white font-medium">{userInfo.username}</span>
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-2 w-44 rounded-xl
                                   bg-[#0F172A] border border-[#1E293B]
                                   shadow-xl overflow-hidden"
                      >
                        <NavLink
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#020617]"
                        >
                          Profile
                        </NavLink>
                        {isAdmin && (
                          <NavLink
                            to="/admin/movies/dashboard"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#020617]"
                          >
                            Admin Dashboard
                          </NavLink>
                        )}
                        <button
                          onClick={logoutHandler}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#020617]"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:inline-flex px-5 py-2 rounded-full bg-teal-500 text-white font-medium"
                >
                  Sign In
                </Link>
              )}

              {/* MOBILE TOGGLE */}
              <button className="md:hidden text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </nav>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="md:hidden bg-[#0F172A] border-t border-[#1E293B] px-6 py-4 space-y-4"
              >
                {!isAdmin && (
                  <>
                    <NavItem to="/" onClick={() => setMenuOpen(false)}>Home</NavItem>
                    <NavItem to="/movies" onClick={() => setMenuOpen(false)}>Movies</NavItem>
                  </>
                )}
                {isAdmin && (
                  <>
                    <NavItem to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavItem>
                    <NavItem to="/admin/movies" onClick={() => setMenuOpen(false)}>Manage Movies</NavItem>
                  </>
                )}

                {userInfo ? (
                  <>
                    <NavLink to="/profile" className="block text-center py-2 rounded-full bg-[#020617] text-white">
                      Profile
                    </NavLink>
                    <button
                      onClick={logoutHandler}
                      className="w-full py-2 rounded-full bg-red-500/10 text-red-400"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="block text-center py-2 rounded-full bg-teal-500 text-white">
                    Sign In
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
