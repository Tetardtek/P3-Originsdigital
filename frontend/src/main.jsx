import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthProvider, useAuth } from "./context/AuthContext";
import App from "./App";
import { VideoProvider } from "./context/VideoContext";
import Dashboard from "./pages/admin/Dashboard";
import Content from "./pages/admin/Content";
import Playlist from "./pages/admin/Playlist";
import Users from "./pages/admin/Users";
import Videos from "./pages/Videos";
import Playlists from "./pages/Playlists";
import LogIn from "./pages/Login";
import Register from "./pages/Signup";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Popup from "./components/Popup";
import BackToTopButton from "./components/BackToTopButton";

function PrivateRoute({ element, requiresAuth, allowedRoles }) {
  const { user } = useAuth();

  if (requiresAuth && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/login" />;
  }

  return element;
}

PrivateRoute.propTypes = {
  element: PropTypes.node,
  requiresAuth: PropTypes.bool,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

PrivateRoute.defaultProps = {
  element: null,
  requiresAuth: false,
  allowedRoles: [],
};

function Main() {
  const { user, setUser } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");

    if (user && loginSuccess) {
      setShowPopup(true);
      localStorage.removeItem("loginSuccess");
      setUser((prevUser) => ({ ...prevUser }));
    }
  }, [user, setUser]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <PrivateRoute
              element={<Dashboard />}
              requiresAuth
              allowedRoles={["3"]}
            />
          }
        />
        <Route
          path="/content/*"
          element={
            <PrivateRoute
              element={<Content />}
              requiresAuth
              allowedRoles={["3"]}
            />
          }
        />
        <Route
          path="/playlist/*"
          element={
            <PrivateRoute
              element={<Playlist />}
              requiresAuth
              allowedRoles={["3"]}
            />
          }
        />
        <Route
          path="/users/*"
          element={
            <PrivateRoute
              element={<Users />}
              requiresAuth
              allowedRoles={["3"]}
            />
          }
        />
        <Route path="/videos" element={<Videos />} />
        <Route
          path="/playlists"
          element={
            <PrivateRoute
              element={<Playlists />}
              requiresAuth
              allowedRoles={["1", "3"]}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute
              element={<Settings />}
              requiresAuth
              allowedRoles={["1", "3"]}
            />
          }
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LogIn />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/forgot-password"
          element={user ? <Navigate to="/" /> : <ForgotPassword />}
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/" element={<App />} />
      </Routes>
      {showPopup && (
        <Popup onClose={closePopup} confirmButtonText="Fermer">
          <p>Successful login! Welcome to our website!</p>
        </Popup>
      )}
      <BackToTopButton />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <VideoProvider>
          <Main />
        </VideoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
