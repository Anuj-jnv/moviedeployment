import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";

import { toast } from "react-toastify";
import GenreForm from "../../components/GenreForm.jsx";
import Modal from "../../components/Modal.jsx";
import Skeleton from "../../components/common/Skelton";
import ErrorState from "../../components/common/ErrorState";

const GenreList = () => {
  const { data: genres, isLoading, error, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Tray again.");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal-400">Manage Genres</h1>
          <p className="text-gray-400 mt-2">Create, update, and delete movie genres</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <GenreForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateGenre}
            />
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Existing Genres</h2>
            <div className="flex flex-wrap gap-3">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} variant="button" className="w-20 h-10" />
                ))
              ) : error ? (
                <ErrorState
                  title="Failed to load genres"
                  message="We couldn't fetch the genres list. Please try again."
                  onRetry={() => refetch()}
                  className="col-span-full"
                />
              ) : genres?.length > 0 ? (
                genres.map((genre) => (
                  <button
                    key={genre._id}
                    className="bg-gray-700 border border-teal-500 text-teal-400 py-2 px-4 rounded-lg hover:bg-teal-500 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={() => {
                      setModalVisible(true);
                      setSelectedGenre(genre);
                      setUpdatingName(genre.name);
                    }}
                  >
                    {genre.name}
                  </button>
                ))
              ) : (
                <p className="text-gray-400">No genres found.</p>
              )}
            </div>
          </div>
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;