import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import Skeleton from "../../components/common/Skelton";
import ErrorState from "../../components/common/ErrorState";

const AdminMoviesList = () => {
  const { data: movies, isLoading, error } = useGetAllMoviesQuery();

  return (
    <div className="bg-gray-800 min-h-screen text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Manage Movies</h1>
          <p className="text-gray-400 mt-2">
            Total Movies: {isLoading ? "Loading..." : movies?.length || 0}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} variant="card" className="h-80" />
            ))
          ) : error ? (
            <div className="col-span-full">
              <ErrorState
                title="Failed to load movies"
                message="We couldn't fetch the movies list. Please try again."
                onRetry={() => window.location.reload()}
              />
            </div>
          ) : movies?.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{movie.name}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{movie.detail}</p>
                  <Link
                    to={`/admin/movies/update/${movie._id}`}
                    className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Update Movie
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No movies found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
       

export default AdminMoviesList;