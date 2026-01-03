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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">

        {/* BACK BUTTON */}
        <Link
          to={backPath}
          className="inline-flex items-center gap-2 text-teal-400 font-medium hover:underline mb-8"
        >
          <MoveLeftIcon size={20} />
          Back
        </Link>

        {/* LOADING */}
        {isLoading && (
          <div className="space-y-8">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

              {/* LEFT: POSTER */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-24">
                  <div
                    className="
                      relative w-full
                      aspect-[2/3]
                      max-h-[520px]
                      sm:max-h-[560px]
                      lg:max-h-[600px]
                      overflow-hidden
                      rounded-2xl
                      shadow-2xl
                      mx-auto
                    "
                  >
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT: DETAILS */}
              <div className="lg:col-span-8 space-y-8">

                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                  {movie.name}
                </h1>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {movie.detail}
                </p>

                {/* INFO CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  <div className="bg-gray-800 p-6 rounded-xl">
                    <p className="text-sm text-gray-400 mb-1">
                      Release Year
                    </p>
                    <p className="text-3xl font-bold">
                      {movie.year}
                    </p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl">
                    <p className="text-sm text-gray-400 mb-3">
                      Cast
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {movie.cast.map((actor, idx) => (
                        <span
                          key={idx}
                          className="
                            bg-gray-700
                            px-3 py-1
                            rounded-md
                            text-sm
                            whitespace-nowrap
                          "
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
            <div className="mt-14 md:mt-16">
              <MovieTabs
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                movie={movie}
                loadingMovieReview={loadingMovieReview}
                userInfo={userInfo}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
