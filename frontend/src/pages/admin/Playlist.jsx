import React from "react";
import NavBar from "../../components/NavBar";
import AddPlaylist from "../../components/admin/playlist/AddPlaylist";
import ManagePlaylist from "../../components/admin/playlist/ManagePlaylist";
import "../../styles/admin/Playlist.scss";

export default function Playlist() {
  return (
    <>
      <NavBar />
      <main>
        <h1>Origin's Digital playlist Panel</h1>
        <div className="playlist-container">
          <AddPlaylist />
          <div className="playlist-manage-container">
            <ManagePlaylist />
          </div>
        </div>
      </main>
    </>
  );
}
