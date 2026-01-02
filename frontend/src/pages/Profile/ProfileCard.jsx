import { useSelector } from "react-redux";

const ProfileCard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const initials = userInfo?.username?.[0]?.toUpperCase() || "U";

  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 text-center">
      <div className="mx-auto h-28 w-28 rounded-full bg-teal-500
                      flex items-center justify-center
                      text-4xl font-bold text-black">
        {initials}
      </div>

      <h2 className="mt-4 text-xl font-semibold text-white">
        {userInfo?.username}
      </h2>

      <p className="text-sm text-gray-400 mt-1">
        {userInfo?.email}
      </p>
    </div>
  );
};

export default ProfileCard;
