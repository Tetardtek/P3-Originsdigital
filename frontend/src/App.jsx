import React from "react";
import { useAuth } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import NavBarAdmin from "./components/admin/NavBarAdmin";
import Home from "./pages/Home";
import "./styles/App.scss";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user?.role === 3 && !window.location.pathname.includes("/settings") ? (
        <NavBarAdmin />
      ) : (
        <NavBar />
      )}
      <Home />
    </>
  );
}
