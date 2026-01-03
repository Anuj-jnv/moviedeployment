import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import banner from "/assests/banner1.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";
import Skeleton from "../../components/common/Skelton";
import ErrorState from "../../components/common/ErrorState";

const AllMovies = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useGetAllMoviesQuery();
  const { data: genres, isLoading: genresLoading } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
    
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      dispatch(setMoviesFilter({ searchTerm: searchQuery }));
    }
  }, [data, dispatch, searchParams]);

  const applyFilters = (overrides = {}) => {
    const filters = { ...moviesFilter, ...overrides };
    let base = data || [];

    if (filters.selectedSort === "new") base = newMovies || [];
    if (filters.selectedSort === "top") base = topMovies || [];
    if (filters.selectedSort === "random") base = randomMovies || [];

    let result = base.filter((movie) => {
      if (filters.searchTerm) {
        if (!movie.name.toLowerCase().includes(filters.searchTerm.toLowerCase()))
          return false;
      }
      if (filters.selectedGenre) {
        if (movie.genre !== filters.selectedGenre) return false;
      }
      if (filters.selectedYear) {
        if (movie.year !== +filters.selectedYear) return false;
      }
      return true;
    });

    dispatch(setFilteredMovies(result));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setMoviesFilter({ searchTerm: value }));
    applyFilters({ searchTerm: value });
  };

  const handleGenreClick = (genreId) => {
    dispatch(setMoviesFilter({ selectedGenre: genreId }));
    applyFilters({ selectedGenre: genreId });
  };

  const handleYearChange = (year) => {
    dispatch(setMoviesFilter({ selectedYear: year }));
    applyFilters({ selectedYear: year });
  };

  const handleSortChange = (sortOption) => {
    dispatch(setMoviesFilter({ selectedSort: sortOption }));
    applyFilters({ selectedSort: sortOption });
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <section className="relative h-96 md:h-[50rem] w-full mb-10 flex items-center justify-center bg-cover" style={{ backgroundImage: `url(${banner})`, backgroundPosition: '50% center' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4">The Movies Hub</h1>
          <p className="text-lg md:text-xl lg:text-2xl">Cinematic Odyssey: Unveiling the Magic of Movies</p>
        </div>
      </section>

      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            className="flex-1 h-12 px-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Search Movie"
            value={moviesFilter.searchTerm}
            onChange={handleSearchChange}
          />
          <select
            className="h-12 px-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
            value={moviesFilter.selectedGenre}
            onChange={(e) => handleGenreClick(e.target.value)}
            disabled={genresLoading}
          >
            <option value="" className="bg-gray-700">
              {genresLoading ? "Loading..." : "Genres"}
            </option>
            {genres?.map((genre) => (
              <option key={genre._id} value={genre._id} className="bg-gray-700">
                {genre.name}
              </option>
            ))}
          </select>
          <select
            className="h-12 px-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={moviesFilter.selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
          >
            <option value="" className="bg-gray-700">Year</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year} className="bg-gray-700">
                {year}
              </option>
            ))}
          </select>
          <select
            className="h-12 px-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={moviesFilter.selectedSort}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="" className="bg-gray-700">Sort By</option>
            <option value="new" className="bg-gray-700">New Movies</option>
            <option value="top" className="bg-gray-700">Top Movies</option>
            <option value="random" className="bg-gray-700">Random Movies</option>
          </select>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-full max-w-sm">
                <Skeleton variant="card" className="h-96" />
              </div>
            ))
          ) : error ? (
            <div className="col-span-full">
              <ErrorState
                title="Failed to load movies"
                message="We couldn't fetch the movies. Please check your connection and try again."
                onRetry={() => window.location.reload()}
              />
            </div>
          ) : filteredMovies?.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No movies found matching your criteria.</p>
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default AllMovies;