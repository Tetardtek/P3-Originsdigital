import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Dashboard from "./pages/admin/dashboard";
import Content from "./pages/admin/content";
import Category from "./pages/admin/category";
import Users from "./pages/admin/users";
import Videos from "./pages/videos";
import PLaylists from "./pages/playlists";
import LogIn from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Dashboard />,
  },
  {
    path: "/content",
    element: <Content />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/videos",
    element: <Videos />,
  },
  {
    path: "/playlists",
    element: <PLaylists />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
