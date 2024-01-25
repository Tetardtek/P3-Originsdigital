import React from "react";
import NavBar from "../../components/NavBar";
import AddVideo from "../../components/admin/AddVideo";
import AddPlaylist from "../../components/admin/playlist/AddPlaylist";
import "../../styles/admin/Dashboard.scss";

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <main>
        <div className="container-dashboard">
          <AddPlaylist />
          <AddVideo />
        </div>
      </main>
    </>
  );
}
