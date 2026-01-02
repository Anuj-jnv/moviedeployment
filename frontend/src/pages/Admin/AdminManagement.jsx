import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";

const AdminManagement = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const { data: movies, isLoading: moviesLoading } = useGetAllMoviesQuery();
  const { data: genres, isLoading: genresLoading } = useFetchGenresQuery();

  // Extract all comments from movies
  const allComments = movies?.flatMap(movie =>
    movie.reviews?.map(review => ({
      ...review,
      movieName: movie.name,
      movieId: movie._id
    })) || []
  ) || [];

  const tabs = [
    { id: "movies", label: "Movies", count: movies?.length || 0 },
    { id: "genres", label: "Genres", count: genres?.length || 0 },
    { id: "comments", label: "Comments", count: allComments?.length || 0 },
  ];

  return (
    <div className="bg-gray-800 min-h-screen text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Management</h1>
          <p className="text-gray-400 mt-2">Manage all content and data</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-700 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-teal-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-600"
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-600 text-xs px-2 py-1 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Movies Tab */}
          {activeTab === "movies" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Movies Management</h2>
                <Link
                  to="/admin/movies/create"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Movie
                </Link>
              </div>

              {moviesLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
                  <p className="text-gray-400 mt-4">Loading movies...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {movies?.map((movie) => (
                    <div
                      key={movie._id}
                      className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <img
                        src={movie.image}
                        alt={movie.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{movie.name}</h3>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{movie.detail}</p>
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/movies/update/${movie._id}`}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-300 text-center text-sm"
                          >
                            Edit
                          </Link>
                          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-300 text-sm">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Genres Tab */}
          {activeTab === "genres" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Genres Management</h2>
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Genre
                </button>
              </div>

              {genresLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
                  <p className="text-gray-400 mt-4">Loading genres...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {genres?.map((genre) => (
                    <div
                      key={genre._id}
                      className="bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="font-bold text-xl mb-4 text-center">{genre.name}</h3>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-300">
                          Edit
                        </button>
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-300">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Comments Management</h2>
                <p className="text-gray-400 mt-2">Review and moderate user comments</p>
              </div>

              {moviesLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
                  <p className="text-gray-400 mt-4">Loading comments...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {allComments?.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-gray-700 rounded-lg p-6 shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{comment.name}</h3>
                          <p className="text-gray-400 text-sm">Movie: {comment.movieName}</p>
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300">
                          Delete
                        </button>
                      </div>
                      <p className="text-gray-300">{comment.comment}</p>
                      <div className="flex items-center mt-4 text-sm text-gray-400">
                        <span>Rating: {comment.rating}/5</span>
                        <span className="mx-4">•</span>
                        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  {allComments?.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-400">No comments found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;