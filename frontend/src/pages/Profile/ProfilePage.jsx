import ProfileLayout from "./ProfileLayout";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";

const ProfilePage = () => {
  return (
    <div className="pt-20 pb-12 min-h-screen bg-[#020617]">
      <ProfileLayout>
        <ProfileCard />
        <ProfileForm />
      </ProfileLayout>
    </div>
  );
};

export default ProfilePage;
