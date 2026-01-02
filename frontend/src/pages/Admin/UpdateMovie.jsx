import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image:", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: uploadedImagePath,
        },
      });

      navigate("/movies");
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      toast.success("Movie deleted successfully");
      await deleteMovie(id);
      navigate("/movies");
    } catch (error) {
      console.error("Failed to delete movie:", error);
      toast.error(`Failed to delete movie: ${error?.message}`);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal-400">Update Movie</h1>
          <p className="text-gray-400 mt-2">Modify movie details</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={movieData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Year:
                <input
                  type="number"
                  name="year"
                  value={movieData.year}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Detail:
              <textarea
                name="detail"
                value={movieData.detail}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Cast (comma separated):
              <input
                type="text"
                name="cast"
                value={movieData.cast?.join(", ") || ""}
                onChange={handleCastChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Actor 1, Actor 2, Actor 3"
              />
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700"
              />
            </label>
            {selectedImage && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
            {movieData.image && !selectedImage && (
              <div className="mt-4">
                <img
                  src={movieData.image}
                  alt="Current"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isUpdatingMovie || isUploadingImage}
              className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Delete Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;