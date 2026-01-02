import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import Skeleton from "../../components/common/Skelton";
import ErrorState from "../../components/common/ErrorState";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, isLoading, error, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-block text-teal-400 font-semibold hover:underline mb-8"
        >
          ← Go Back
        </Link>

        {isLoading ? (
          <div className="space-y-8">
            <Skeleton variant="rectangle" height="400px" className="w-full max-w-2xl mx-auto rounded-lg" />
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <Skeleton variant="text" lines={3} />
                <Skeleton variant="text" lines={2} />
              </div>
              <div className="lg:w-80 space-y-4">
                <Skeleton variant="text" lines={1} />
                <Skeleton variant="text" lines={5} />
              </div>
            </div>
          </div>
        ) : error ? (
          <ErrorState
            title="Movie not found"
            message="We couldn't load the movie details. It might have been removed or you might not have permission to view it."
            onRetry={() => refetch()}
          />
        ) : movie ? (
          <>
            <div className="mb-8">
              <div className="flex justify-center">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full max-w-2xl rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
              <section className="flex-1">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4">{movie.name}</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {movie.detail}
                </p>
              </section>

              <div className="lg:w-80">
                <p className="text-xl font-semibold mb-4">
                  Release Year: {movie.year}
                </p>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Cast:</h3>
                  <ul className="space-y-1">
                    {movie.cast.map((c, index) => (
                      <li key={index} className="text-gray-300">{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <MovieTabs
                loadingMovieReview={loadingMovieReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                movie={movie}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MovieDetails;