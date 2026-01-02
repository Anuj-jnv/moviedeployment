import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Loader from "../../components/common/Loader.jsx";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
   
      <div
  className="relative flex-grow
             flex items-start justify-center
             pt-28 pb-10
             bg-cover bg-center"

      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop)",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/80" />

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4
                   bg-white/5 backdrop-blur-xl
                   border border-white/10
                   rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-300 text-sm text-center mb-6">
          Sign in to continue watching
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
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

          {/* PASSWORD WITH EYE TOGGLE */}
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

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            disabled={isLoading}
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 transition
                       text-white py-2.5 rounded-md font-medium text-base"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </motion.button>

          {isLoading && <Loader />}
        </form>

        <p className="text-gray-300 text-sm text-center mt-6">
          New here?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="text-teal-400 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
