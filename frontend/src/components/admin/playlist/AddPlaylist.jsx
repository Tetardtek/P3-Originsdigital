import React, { useState, useEffect } from "react";

export default function AddPlaylist() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [playlists, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlists/`
      );
      const data = await response.json();
      setPlaylist(data);
    };

    fetchPlaylists();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlists/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            link,
            description,
          }),
        }
      );
      if (!response.ok) {
        console.warn("Serveur response:", await response.text());
        return;
      }
      const data = await response.json();
      console.info("data", data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deletePlaylist = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlists/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete playlist.");
      }

      setPlaylist(playlists.filter((playlist) => playlist.id !== id));
    } catch (err) {
      console.error(err.message);
    }
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
                <button
                  type="button"
                  onClick={() => deletePlaylist(playlist.id)}
                >
                  x
                </button>
                ID : {playlist.id} - {playlist.title} - {playlist.link} -{" "}
                {playlist.description}{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
