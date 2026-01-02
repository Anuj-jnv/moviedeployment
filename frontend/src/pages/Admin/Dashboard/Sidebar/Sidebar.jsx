import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 min-h-screen border-r-2 border-gray-700 fixed left-0 top-20">
      <ul className="py-4">
        <li className="text-lg bg-gradient-to-b from-green-500 to-lime-400 rounded-full mb-4">
          <Link
            to="/admin/movies/dashboard"
            className="block p-2 ml-4"
          >
            Dashboard
          </Link>
        </li>
        <li className="text-lg hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full mb-4">
          <Link to="/admin/movies/create" className="block p-2 ml-4">
            Create Movie
          </Link>
        </li>
        <li className="text-lg hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full mb-4">
          <Link to="/admin/movies/genre" className="block p-2 ml-4">
            Create Genre
          </Link>
        </li>
        <li className="text-lg hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full mb-4">
          <Link to="/admin/movies-list" className="block p-2 ml-4">
            Update Movie
          </Link>
        </li>
        <li className="text-lg hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full mb-4">
          <Link to="/admin/movies/comments" className="block p-2 ml-4">
            Comments
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;