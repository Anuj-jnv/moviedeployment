import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const { userInfo } = useSelector((state) => state.auth);
  
  return (
    <section className="relative bg-gray-800 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mt-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Discover Amazing Movies
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto mt-4">
          Explore our vast collection of movies, from classics to the latest releases.
          Find your next favorite film and enjoy an unparalleled viewing experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/movies"
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Browse Movies
          </Link>
          {!userInfo && (
            <Link
              to="/register"
              className="bg-transparent border-2 border-teal-500 hover:bg-teal-500 text-teal-500 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out"
            >
              Join Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;