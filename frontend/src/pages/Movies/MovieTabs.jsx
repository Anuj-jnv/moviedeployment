import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MovieTabs = ({ submitHandler, comment, setComment, movie }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const isAdmin = userInfo?.isAdmin === true;
  const isLoggedIn = !!userInfo;

  return (
    <div className="space-y-10">
      {/* ================= WRITE REVIEW ================= */}
      <section>
        {isLoggedIn && !isAdmin ? (
          <form
            onSubmit={submitHandler}
            className="bg-gray-700 p-6 rounded-lg"
          >
            <label
              htmlFor="comment"
              className="block text-xl font-semibold mb-3 text-white"
            >
              Write Your Review
            </label>

            <textarea
              id="comment"
              rows="4"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="
                w-full p-3
                bg-gray-600 border border-gray-500
                rounded-lg
                text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-teal-500
              "
              placeholder="Share your thoughts about this movie..."
            />

            <button
              type="submit"
              className="
                mt-4
                bg-teal-600 hover:bg-teal-700
                text-white py-2 px-6
                rounded-lg font-semibold
                transition
              "
            >
              Submit Review
            </button>
          </form>
        ) : !isLoggedIn ? (
          <p className="text-gray-300">
            Please{" "}
            <Link
              to="/login"
              className="text-teal-400 hover:underline"
            >
              Sign In
            </Link>{" "}
            to write a review
          </p>
        ) : (
          <p className="text-gray-400">
            Admins cannot submit reviews.
          </p>
        )}
      </section>

      {/* ================= REVIEWS LIST ================= */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-white">
          Reviews
        </h3>

        {!movie?.reviews?.length ? (
          <p className="text-gray-400">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {movie.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-700 p-4 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <strong className="text-white">
                    {review.name}
                  </strong>
                  <span className="text-gray-400 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-300">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;
