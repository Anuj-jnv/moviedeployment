import SliderUtil from "../../components/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="bg-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <nav className="w-full md:w-auto">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="bg-gray-700 hover:bg-gray-600 text-white transition duration-300 ease-in-out block px-4 py-2 rounded-lg text-lg font-medium text-center"
              >
                Home
              </Link>
              <Link
                to="/movies"
                className="bg-gray-700 hover:bg-gray-600 text-white transition duration-300 ease-in-out block px-4 py-2 rounded-lg text-lg font-medium text-center"
              >
                Browse Movies
              </Link>
            </div>
          </nav>

          <div className="w-full md:flex-1">
            <SliderUtil data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export  {Header};