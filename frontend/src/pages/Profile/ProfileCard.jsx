import { useSelector } from "react-redux";
import { ShieldCheck, User } from "lucide-react";

const ProfileCard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const initials = userInfo?.username?.[0]?.toUpperCase() || "U";
  const isAdmin = userInfo?.isAdmin === true;

  return (
    <div className="
      bg-[#0F172A]
      border border-[#1E293B]
      rounded-xl
      p-5
      flex flex-col
      h-full
    ">
      {/* Top: Avatar */}
      <div className="flex justify-center mt-1">
        <div className="
          h-20 w-20
          rounded-full
          bg-teal-500/90
          flex items-center justify-center
          text-2xl font-semibold text-black
        ">
          {initials}
        </div>
      </div>

      {/* Middle: Name & Email */}
      <div className="text-center mt-3">
        <h2 className="text-base font-semibold text-white truncate">
          {userInfo?.username}
        </h2>
        <p className="text-xs text-gray-400 mt-0.5 truncate">
          {userInfo?.email}
        </p>
      </div>

      {/* Spacer to push role section down */}
      <div className="flex-1" />

      {/* Bottom: Role Section (USES EMPTY SPACE) */}
      <div
        className={`
          mt-4
          rounded-lg
          border
          px-3 py-2
          flex items-center justify-center gap-2
          text-sm font-medium
          ${
            isAdmin
              ? "border-teal-500/40 bg-teal-500/10 text-teal-400"
              : "border-slate-500/30 bg-slate-500/10 text-slate-300"
          }
        `}
      >
        {isAdmin ? (
          <ShieldCheck size={16} />
        ) : (
          <User size={16} />
        )}
        {isAdmin ? "Administrator Access" : "Standard User"}
      </div>
    </div>
  );
};

export default ProfileCard;
