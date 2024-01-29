import React, { useContext } from "react";
import { VideoContext } from "../../../context/VideoContext";

export default function PlaylistList() {
  const { playlists, deletePlaylist } = useContext(VideoContext);

  const handleDelete = (id) => {
    deletePlaylist(id);
  };

  return (
    <div className="playlist-list-container">
      <h2>Playlist List</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            ID: {playlist.id} - {playlist.title} - {playlist.link} -{" "}
            {playlist.description}{" "}
            <button type="button" onClick={() => handleDelete(playlist.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
