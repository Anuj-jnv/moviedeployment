import { apiSlice } from "./apiSlice";

export const moviesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `all-movies`,
    }),
    getMovie: builder.query({
      query: (id) => `specific-movie/${id}`,
    }),
    getNewMovies: builder.query({
      query: () => `new-movies`,
    }),
    getTopMovies: builder.query({
      query: () => `top-movies`,
    }),
    getRandomMovies: builder.query({
      query: () => `random-movies`,
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useGetMovieQuery,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} = moviesApi;
