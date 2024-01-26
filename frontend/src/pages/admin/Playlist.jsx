import React from "react";
import NavBar from "../../components/NavBar";
import ManagePlaylist from "../../components/admin/playlist/ManagePlaylist";
import PlaylistList from "../../components/admin/playlist/PlaylistList";
import "../../styles/admin/Playlist.scss";

export default function Playlist() {
  return (
    <>
      <NavBar />
      <main>
        <h1>Playlist Panel</h1>
        <div className="playlist-container">
          <div className="playlist-manage-container">
            <PlaylistList />
            <ManagePlaylist />
          </div>
        </div>
      </main>
    </>
  );
}
