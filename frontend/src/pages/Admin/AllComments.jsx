import {
    useDeleteCommentMutation,
    useGetAllMoviesQuery,
  } from "../../redux/api/movies";
  import { toast } from "react-toastify";
  
  const AllComments = () => {
    const { data: movies, refetch } = useGetAllMoviesQuery();
  
    const [deleteComment] = useDeleteCommentMutation();
  
    const handleDeleteComment = async (movieId, reviewId) => {
      try {
        await deleteComment({ movieId, reviewId });
        toast.success("Comment Deleted");
        refetch();
      } catch (error) {
        console.error("Error deleting comment: ", error);
      }
    };
  
    return (
    <div className="bg-gray-800 min-h-screen text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal-400">Manage Comments</h1>
          <p className="text-gray-400 mt-2">Review and delete user comments</p>
        </div>

        <div className="space-y-8">
          {movie?.map((m) => (
            <div key={m._id} className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-teal-400">{m.name}</h2>
              {m?.reviews?.length > 0 ? (
                <div className="space-y-4">
                  {m.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-gray-600 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-white">{review.name}</strong>
                        <p className="text-gray-400 text-sm">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <p className="text-gray-300 mb-4">{review.comment}</p>

                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition duration-300"
                        onClick={() => handleDeleteComment(m._id, review._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No comments for this movie.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  };
  export default AllComments;