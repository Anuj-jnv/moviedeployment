import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../components/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="bg-gray-800 min-h-screen text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:justify-between items-start">
          <nav className="mb-8 lg:mb-0 lg:mr-8">
            <h2 className="text-2xl font-bold mb-4">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {genres?.map((g) => (
                <button
                  key={g._id}
                  className={`transition duration-300 ease-in-out hover:bg-gray-700 bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedGenre === g._id ? "bg-teal-600" : ""
                  }`}
                  onClick={() => handleGenreClick(g._id)}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </nav>

          <section className="flex-1">
            <div className="mb-12">
              <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">Choose for You</h1>
              <SliderUtil data={randomMovies} />
            </div>

            <div className="mb-12">
              <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">Top Movies</h1>
              <SliderUtil data={topMovies} />
            </div>

            <div className="mb-12">
              <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">Choose Movies</h1>
              <SliderUtil data={filteredMovies} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MoviesContainerPage;