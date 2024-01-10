import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import Dashboard from "./pages/admin/Dashboard";
import Content from "./pages/admin/Content";
import Category from "./pages/admin/Category";
import Users from "./pages/admin/Users";
import Videos from "./pages/Videos";
import Playlists from "./pages/Playlists";
import LogIn from "./pages/Login2";
import Register from "./pages/Signup";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/content" element={<Content />} />
          <Route path="/category" element={<Category />} />
          <Route path="/users" element={<Users />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<App />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
