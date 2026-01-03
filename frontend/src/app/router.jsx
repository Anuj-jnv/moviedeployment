import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";


// Auth
import AdminRoute from "../pages/Admin/AdminRoute.jsx";
import GenreList from "../pages/Admin/GenreList.jsx";

// Restricted
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import PrivateRoute from "../pages/Auth/PrivateRoute.jsx";

import Home from "../pages/Home";
import Profile from "../pages/Profile/ProfilePage.jsx";
import AdminMoviesList from "../pages/Admin/AdminMoviesList.jsx";
import UpdateMovie from "../pages/Admin/UpdateMovie.jsx";
import CreateMovie from "../pages/Admin/CreateMovie.jsx";
import AllMovies from "../pages/Movies/AllMovies.jsx";
import MovieDetails from "../pages/Movies/MovieDetails.jsx";
import AllComments from "../pages/Admin/AllComments.jsx";
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard.jsx";
import AdminManagement from "../pages/Admin/AdminManagement.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "movies", element: <AllMovies /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "movies/:id", element: <MovieDetails /> },

      {
        element: <PrivateRoute />,
        children: [{ path: "profile", element: <Profile /> }],
      },

      {
        element: <AdminRoute />,
        children: [
          { path: "admin/movies/genre", element: <GenreList /> },
          { path: "admin/movies/create", element: <CreateMovie /> },
          { path: "admin/movies-list", element: <AdminMoviesList /> },
          { path: "admin/movies/update/:id", element: <UpdateMovie /> },
          { path: "admin/movies/dashboard", element: <AdminDashboard /> },
          { path: "admin/movies/manage", element: <AdminManagement /> },
          { path: "admin/movies/comments", element: <AllComments /> },
        ],
      },
    ],
  },
]);

export default router;
