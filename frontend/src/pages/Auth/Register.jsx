import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Loader from "../../components/common/Loader.jsx";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { useRegisterMutation } from "../../redux/api/users.js";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Account created successfully");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div
    
  className="relative flex-grow flex items-center justify-center bg-cover bg-center pt-12"

      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop)",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/80" />

      {/* REGISTER CARD */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="
          relative z-10 w-full max-w-md mx-4
          max-h-[80vh] overflow-y-auto
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl shadow-2xl
          px-8 py-6
        "
      >
        <h1 className="text-3xl font-bold text-white text-center mb-1">
          Create Account
        </h1>
        <p className="text-gray-300 text-sm text-center mb-5">
          Join MovieHub and start exploring
        </p>

        <form onSubmit={submitHandler} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full rounded-md bg-black/40 border border-white/20
                         px-4 py-2.5 text-white placeholder-gray-400
                         focus:outline-none focus:border-teal-500"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full rounded-md bg-black/40 border border-white/20
                         px-4 py-2.5 text-white placeholder-gray-400
                         focus:outline-none focus:border-teal-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-md bg-black/40 border border-white/20
                           px-4 py-2.5 pr-12 text-white placeholder-gray-400
                           focus:outline-none focus:border-teal-500"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center
                           text-gray-400 hover:text-white"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full rounded-md bg-black/40 border border-white/20
                           px-4 py-2.5 pr-12 text-white placeholder-gray-400
                           focus:outline-none focus:border-teal-500"
                placeholder=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center
                           text-gray-400 hover:text-white"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            disabled={isLoading}
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 transition
                       text-white py-2.5 rounded-md font-medium text-base mt-2"
          >
            {isLoading ? "Registering..." : "Create Account"}
          </motion.button>

          {isLoading && <Loader />}
        </form>

        <p className="text-gray-300 text-sm text-center mt-5">
          Already have an account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-teal-400 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
