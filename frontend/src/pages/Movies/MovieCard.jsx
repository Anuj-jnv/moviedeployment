import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div key={movie._id} className="relative group m-2 md:m-4">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          width="384"
          height="384"
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded object-cover m-0 p-0 transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
      </Link>

      <p className="absolute top-[85%] left-0 right-0 text-center opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {movie.name}
      </p>
    </div>
  );
};

export default MovieCard;