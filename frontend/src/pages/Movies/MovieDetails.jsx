import { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MoveLeftIcon } from "lucide-react";

import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";

import MovieTabs from "./MovieTabs";
import Skeleton from "../../components/common/Skelton";
import ErrorState from "../../components/common/ErrorState";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const location = useLocation();

  const backPath = location.state?.from || "/";

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: movie,
    isLoading,
    error,
    refetch,
  } = useGetSpecificMovieQuery(movieId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ id: movieId, rating, comment }).unwrap();
      toast.success("Review created successfully");
      setComment("");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add review");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* BACK BUTTON */}
        <Link
          to={backPath}
          className="inline-flex items-center text-teal-400
                     font-medium hover:underline mb-10"
        >
          <MoveLeftIcon className="mr-2" />
          Back
        </Link>

        {/* LOADING */}
        {isLoading && (
          <div className="space-y-10">
            <Skeleton variant="rectangle" height="420px" />
            <Skeleton variant="text" lines={4} />
          </div>
        )}

        {/* ERROR */}
        {error && (
          <ErrorState
            title="Movie not found"
            message="Unable to load movie details."
            onRetry={refetch}
          />
        )}

        {/* CONTENT */}
        {movie && !isLoading && !error && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* LEFT */}
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-8 space-y-10">
                <h1 className="text-4xl font-extrabold">
                  {movie.name}
                </h1>

                <p className="text-gray-300 text-lg">
                  {movie.detail}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 p-6 rounded-xl">
                    <p className="text-sm text-gray-400">Release Year</p>
                    <p className="text-3xl font-bold">{movie.year}</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl">
                    <p className="text-sm text-gray-400 mb-3">Cast</p>
                    <div className="grid grid-cols-2 gap-2">
                      {movie.cast.map((actor, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-700 rounded-md
                                     px-3 py-1 text-sm"
                        >
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* REVIEWS */}
            <div className="mt-16">
              <MovieTabs
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                movie={movie}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
