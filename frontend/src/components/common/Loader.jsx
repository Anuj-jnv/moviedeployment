import { motion } from "framer-motion";

const Loader = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-t-4 border-teal-500 border-opacity-50`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loader;