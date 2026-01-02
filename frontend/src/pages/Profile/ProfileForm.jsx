import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../components/common/Loader.jsx";
import { useProfileMutation } from "../../redux/api/users";
import { setCredentials } from "../../redux/features/auth/authSlice";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(res));

      setPassword("");
      setConfirmPassword("");
      setSuccess(true);

      toast.success("Profile updated successfully");

      setTimeout(() => setSuccess(false), 1800);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">
          Update Profile
        </h2>

        {/* SUCCESS ANIMATION */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="flex items-center gap-1 text-teal-400 text-sm font-medium"
            >
              ✓ Saved
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Username */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">
            Username
          </label>
          <input
            type="text"
            className="w-full rounded-md bg-[#020617]
                       border border-[#1E293B]
                       px-3 py-2 text-sm text-white
                       focus:outline-none focus:border-teal-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-md bg-[#020617]
                       border border-[#1E293B]
                       px-3 py-2 text-sm text-white
                       focus:outline-none focus:border-teal-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-400 mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Leave blank to keep current password"
            className="w-full rounded-md bg-[#020617]
                       border border-[#1E293B]
                       px-3 py-2 text-sm text-white
                       focus:outline-none focus:border-teal-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-400 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full rounded-md bg-[#020617]
                       border border-[#1E293B]
                       px-3 py-2 text-sm text-white
                       focus:outline-none focus:border-teal-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* ACTION ROW */}
        <div className="md:col-span-2 flex items-center justify-end gap-3 mt-2">
          {isLoading && <Loader />}
          <button
            type="submit"
            disabled={isLoading}
            className={`px-5 py-2 rounded-md text-sm font-medium
              ${
                isLoading
                  ? "bg-teal-500/50 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              } text-white transition`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
