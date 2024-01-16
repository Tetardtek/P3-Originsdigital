import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import App from "./App";
import Dashboard from "./pages/admin/Dashboard";
import Content from "./pages/admin/Content";
import Category from "./pages/admin/Category";
import Users from "./pages/admin/Users";
import Videos from "./pages/Videos";
import Playlists from "./pages/Playlists";
import LogIn from "./pages/Login";
import Register from "./pages/Signup";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Popup from "./components/Popup";

function PrivateRoute({ element, requiresAuth, ...props }) {
  const { user } = useAuth();

  if (requiresAuth && !user) {
    return <Navigate to="/login" />;
  }

  if (!requiresAuth && user) {
    return <Navigate to="/" />;
  }

  return React.cloneElement(element, props);
}

function Main() {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");

    if (user && loginSuccess) {
      setShowPopup(true);
      localStorage.removeItem("loginSuccess");
    }
  }, [user]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Routes>
        <Route
          path="/admin/*"
          element={<PrivateRoute element={<Dashboard />} requiresAuth />}
        />
        <Route
          path="/content/*"
          element={<PrivateRoute element={<Content />} requiresAuth />}
        />
        <Route
          path="/category/*"
          element={<PrivateRoute element={<Category />} requiresAuth />}
        />
        <Route
          path="/users/*"
          element={<PrivateRoute element={<Users />} requiresAuth />}
        />
        <Route path="/videos" element={<Videos />} />
        <Route
          path="/playlists"
          element={<PrivateRoute element={<Playlists />} requiresAuth />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LogIn />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/settings"
          element={<PrivateRoute element={<Settings />} requiresAuth />}
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
    </>
  );
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  requiresAuth: PropTypes.bool.isRequired,
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
