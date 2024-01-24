import React, { useContext, useState } from "react";
import { VideoContext } from "../../../context/VideoContext";

export default function AddPlaylist() {
  const { playlists, deletePlaylist, addPlaylist } = useContext(VideoContext);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlaylist({ title, link, description })
      .then(() => {
        setTitle("");
        setLink("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Failed to add playlist.", error);
      });
  };

  const handleDelete = (id) => {
    deletePlaylist(id);
  };

  return (
    <div className="playlist-list-container">
      <div className="container-add-playlist">
        <div className="add-playlist-form">
          <h2>Add Playlist</h2>
          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                <label>
                  Title of playlist :
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title of playlist"
                  />
                </label>
              </li>
              <li>
                <label>
                  Link of playlist :
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Link of playlist"
                  />
                </label>
              </li>
              <li>
                <label>
                  Description of playlist :
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description of playlist"
                  />
                </label>
              </li>
              <li>
                <input type="submit" value="Add playlist" />
              </li>
            </ul>
          </form>
          <h2>Playlist List</h2>
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                ID : {playlist.id} - {playlist.title} - {playlist.link} -{" "}
                {playlist.description}{" "}
                <button type="button" onClick={() => handleDelete(playlist.id)}>
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
