const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="
          space-y-5
          bg-gray-900/80 backdrop-blur
          border border-gray-700/60
          rounded-2xl
          p-6
          shadow-xl
        "
      >
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Genre Details
          </h3>
          <p className="text-sm text-gray-400">
            Add or update movie genres
          </p>
        </div>

        {/* Input */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-400">
            Genre Name
          </label>
          <input
            type="text"
            placeholder="e.g. Action, Thriller"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="
              w-full px-4 py-2.5
              rounded-lg
              bg-gray-800
              border border-gray-700
              text-white text-sm
              placeholder-gray-500
              focus:outline-none
              focus:ring-2 focus:ring-teal-500/50
              focus:border-teal-500
              transition
            "
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center gap-3 pt-2">
          <button
            type="submit"
            className="
              inline-flex items-center justify-center
              px-4 py-2 text-sm font-medium
              rounded-lg
              bg-teal-600 text-white
              hover:bg-teal-700
              focus:outline-none focus:ring-2 focus:ring-teal-500/60
              transition
            "
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="
                inline-flex items-center justify-center
                px-4 py-2 text-sm font-medium
                rounded-lg
                bg-red-600/10 text-red-400
                border border-red-600/30
                hover:bg-red-600/20 hover:border-red-500/50
                focus:outline-none focus:ring-2 focus:ring-red-500/50
                transition
              "
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenreForm;
