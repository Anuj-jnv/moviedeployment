import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import {
  useGetAllMoviesQuery,
  useDeleteMovieMutation,
  useDeleteCommentMutation,
} from "../../redux/api/movies";
import {
  useFetchGenresQuery,
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} from "../../redux/api/genre";

import GenreForm from "../../components/GenreForm";
import Modal from "../../components/Modal";

/* ============================================================
   Reusable Premium Action Buttons (Edit / Delete / Confirm)
============================================================ */
const ActionButtons = ({
  editLink,
  itemId,
  confirmId,
  setConfirmId,
  isDeleting,
  onDelete,
}) => {
  const isConfirming = confirmId === itemId;

  return (
    <div className="flex flex-col gap-2">
      {!isConfirming ? (
        <div className="flex gap-2">
          {editLink && (
            <Link
              to={editLink}
              className="
                flex-1 flex items-center justify-center gap-1.5
                px-3 py-1.5 text-xs font-medium
                rounded-md
                bg-blue-500/10 text-blue-400
                border border-blue-500/20
                hover:bg-blue-500/20 hover:border-blue-400/40
                transition-all
              "
            >
              <Pencil size={14} />
              Edit
            </Link>
          )}

          <button
            onClick={() => setConfirmId(itemId)}
            className="
              flex-1 flex items-center justify-center gap-1.5
              px-3 py-1.5 text-xs font-medium
              rounded-md
              bg-red-500/10 text-red-400
              border border-red-500/20
              hover:bg-red-500/20 hover:border-red-400/40
              transition-all
            "
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="
              flex-1 flex items-center justify-center gap-1.5
              px-3 py-1.5 text-xs font-medium
              rounded-md
              bg-red-600 text-white
              hover:bg-red-700
              disabled:opacity-60 disabled:cursor-not-allowed
              transition
            "
          >
            {isDeleting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              "Confirm"
            )}
          </button>

          <button
            onClick={() => setConfirmId(null)}
            className="
              flex-1 px-3 py-1.5 text-xs
              rounded-md
              border border-gray-600/40
              text-gray-400
              hover:bg-gray-700/30
              transition
            "
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   Main Component
============================================================ */
const AdminManagement = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const [confirmId, setConfirmId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  /* ================= API ================= */
  const {
    data: movies,
    isLoading: moviesLoading,
    refetch: refetchMovies,
  } = useGetAllMoviesQuery();

  const {
    data: genres,
    isLoading: genresLoading,
    refetch: refetchGenres,
  } = useFetchGenresQuery();

  const [deleteMovie] = useDeleteMovieMutation();
  const [deleteGenre] = useDeleteGenreMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();

  /* ================= GENRE MODAL ================= */
  const [genreModalOpen, setGenreModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreName, setGenreName] = useState("");

  /* ================= COMMENTS ================= */
  const allComments =
    movies?.flatMap((movie) =>
      movie.reviews?.map((review) => ({
        ...review,
        movieName: movie.name,
        movieId: movie._id,
      }))
    ) || [];

  /* ================= HANDLERS ================= */
  const handleGenreSubmit = async (e) => {
    e.preventDefault();
    if (!genreName) return toast.error("Genre name required");

    try {
      if (selectedGenre) {
        await updateGenre({
          id: selectedGenre._id,
          updateGenre: { name: genreName },
        }).unwrap();
        toast.success("Genre updated");
      } else {
        await createGenre({ name: genreName }).unwrap();
        toast.success("Genre created");
      }
      refetchGenres();
      setGenreModalOpen(false);
      setGenreName("");
      setSelectedGenre(null);
    } catch {
      toast.error("Operation failed");
    }
  };

  /* ================= TABS ================= */
  const tabs = [
    { id: "movies", label: "Movies", count: movies?.length || 0 },
    { id: "genres", label: "Genres", count: genres?.length || 0 },
    { id: "comments", label: "Comments", count: allComments.length },
  ];

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Management</h1>
          <p className="text-gray-400 mt-1">Manage movies, genres and comments</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-800 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-teal-600"
                  : "text-gray-400 hover:bg-gray-700"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ================= MOVIES ================= */}
        {activeTab === "movies" && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Movies</h2>
              <Link
                to="/admin/movies/create"
                className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md text-sm"
              >
                + Create Movie
              </Link>
            </div>

            {moviesLoading ? (
              <p className="text-gray-400">Loading movies...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies?.map((movie) => (
                  <div
                    key={movie._id}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                  >
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold line-clamp-2">
                        {movie.name}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-3">
                        {movie.detail}
                      </p>

                      <ActionButtons
                        editLink={`/admin/movies/update/${movie._id}`}
                        itemId={movie._id}
                        confirmId={confirmId}
                        setConfirmId={setConfirmId}
                        isDeleting={deletingId === movie._id}
                        onDelete={async () => {
                          try {
                            setDeletingId(movie._id);
                            await deleteMovie(movie._id).unwrap();
                            toast.success("Movie deleted");
                            refetchMovies();
                          } catch {
                            toast.error("Delete failed");
                          } finally {
                            setDeletingId(null);
                            setConfirmId(null);
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ================= GENRES ================= */}
        {activeTab === "genres" && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Genres</h2>
              <button
                onClick={() => setGenreModalOpen(true)}
                className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md text-sm"
              >
                + Create Genre
              </button>
            </div>

            {genresLoading ? (
              <p className="text-gray-400">Loading genres...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {genres?.map((genre) => (
                  <div
                    key={genre._id}
                    className="bg-gray-800 rounded-lg p-5 space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-center">
                      {genre.name}
                    </h3>

                    <ActionButtons
                      itemId={genre._id}
                      confirmId={confirmId}
                      setConfirmId={setConfirmId}
                      isDeleting={deletingId === genre._id}
                      onDelete={async () => {
                        try {
                          setDeletingId(genre._id);
                          await deleteGenre(genre._id).unwrap();
                          toast.success("Genre deleted");
                          refetchGenres();
                        } catch {
                          toast.error("Delete failed");
                        } finally {
                          setDeletingId(null);
                          setConfirmId(null);
                        }
                      }}
                    />

                    <button
                      onClick={() => {
                        setSelectedGenre(genre);
                        setGenreName(genre.name);
                        setGenreModalOpen(true);
                      }}
                      className="w-full text-xs text-blue-400 hover:underline"
                    >
                      Edit Name
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ================= COMMENTS ================= */}
        {activeTab === "comments" && (
          <div className="space-y-4">
            {allComments.map((comment) => (
              <div
                key={comment._id}
                className="bg-gray-800 rounded-lg p-5"
              >
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{comment.name}</h4>
                    <p className="text-xs text-gray-400">
                      {comment.movieName}
                    </p>
                  </div>

                  <ActionButtons
                    itemId={comment._id}
                    confirmId={confirmId}
                    setConfirmId={setConfirmId}
                    isDeleting={deletingId === comment._id}
                    onDelete={async () => {
                      try {
                        setDeletingId(comment._id);
                        await deleteComment({
                          movieId: comment.movieId,
                          reviewId: comment._id,
                        }).unwrap();
                        toast.success("Comment deleted");
                        refetchMovies();
                      } catch {
                        toast.error("Delete failed");
                      } finally {
                        setDeletingId(null);
                        setConfirmId(null);
                      }
                    }}
                  />
                </div>

                <p className="text-gray-300 mt-3">{comment.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= GENRE MODAL ================= */}
      <Modal
        isOpen={genreModalOpen}
        onClose={() => {
          setGenreModalOpen(false);
          setSelectedGenre(null);
          setGenreName("");
        }}
      >
        <GenreForm
          value={genreName}
          setValue={setGenreName}
          handleSubmit={handleGenreSubmit}
          buttonText={selectedGenre ? "Update Genre" : "Create Genre"}
        />
      </Modal>
    </div>
  );
};

export default AdminManagement;
