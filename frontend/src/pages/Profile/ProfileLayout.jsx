const ProfileLayout = ({ children }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
