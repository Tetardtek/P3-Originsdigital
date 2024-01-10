import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import Dashboard from "./pages/admin/Dashboard3";
import Content from "./pages/admin/Content3";
import Category from "./pages/admin/Category3";
import Users from "./pages/admin/Users3";
import Videos from "./pages/Videos3";
import Playlist from "./pages/Playlist3";
import LogIn from "./pages/Login3";
import Register from "./pages/Signup3";

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
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<App />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
