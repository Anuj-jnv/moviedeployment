import { motion } from "framer-motion";

const Skeleton = ({
  variant = "rectangle",
  width = "100%",
  height = "1rem",
  className = "",
  lines = 1,
  animate = true,
}) => {
  const baseClasses = "bg-gray-700 rounded";

  const variants = {
    rectangle: `${baseClasses}`,
    circle: `${baseClasses} rounded-full`,
    text: `${baseClasses} h-4`,
    card: `${baseClasses} p-4 space-y-3`,
    avatar: `${baseClasses} rounded-full`,
  };

  const animationProps = animate
    ? {
        animate: {
          backgroundColor: ["#374151", "#4B5563", "#374151"],
        },
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }
    : {};

  if (variant === "card") {
    return (
      <motion.div
        className={`${variants.card} ${className}`}
        style={{ width, height }}
        {...animationProps}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 bg-gray-600 rounded-full"
            {...animationProps}
          />
          <div className="space-y-2 flex-1">
            <motion.div
              className="h-4 bg-gray-600 rounded w-3/4"
              {...animationProps}
            />
            <motion.div
              className="h-3 bg-gray-600 rounded w-1/2"
              {...animationProps}
            />
          </div>
        </div>
        <motion.div
          className="h-32 bg-gray-600 rounded"
          {...animationProps}
        />
      </motion.div>
    );
  }

  if (variant === "text" && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={`${variants.text} ${index === lines - 1 ? "w-3/4" : "w-full"}`}
            style={{ height }}
            {...animationProps}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${variants[variant]} ${className}`}
      style={{ width, height }}
      {...animationProps}
    />
  );
};

// Predefined skeleton components for common use cases
export const SkeletonCard = ({ className = "" }) => (
  <Skeleton variant="card" className={className} />
);

export const SkeletonText = ({ lines = 3, className = "" }) => (
  <Skeleton variant="text" lines={lines} className={className} />
);

export const SkeletonAvatar = ({ size = "2.5rem", className = "" }) => (
  <Skeleton
    variant="avatar"
    width={size}
    height={size}
    className={className}
  />
);

export const SkeletonButton = ({ width = "6rem", className = "" }) => (
  <Skeleton
    variant="rectangle"
    width={width}
    height="2.5rem"
    className={className}
  />
);

export default Skeleton;