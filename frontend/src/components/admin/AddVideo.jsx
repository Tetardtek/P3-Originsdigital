import React, { useContext, useEffect, useState } from "react";
import { VideoContext } from "../../context/VideoContext";

export default function AddVideo() {
  const { addVideo, playlists, addPlaylist, setPlaylists, updateVideos } =
    useContext(VideoContext);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [minia, setMinia] = useState("");
  const [description, setDescription] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/playlists`
        );

        if (response.ok) {
          const data = await response.json();
          setPlaylists(data);
        } else {
          console.error(`Error fetching playlists: ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error fetching playlists: ${error}`);
      }
    };

    fetchPlaylists();
  }, [setPlaylists]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedPlaylistId) {
        await addVideo({
          link,
          minia,
          title,
          description,
          isFree,
          playlistId: selectedPlaylistId,
        });
      } else if (playlistName.trim() !== "") {
        const newPlaylist = await addPlaylist({
          title: playlistName,
          description: `Description for ${playlistName}`,
        });

        setPlaylists([...playlists, newPlaylist]);

        const updatedPlaylists = [...playlists, newPlaylist];
        const addedPlaylistId = updatedPlaylists.find(
          (p) => p.title === newPlaylist.title
        )?.id;

        await addVideo({
          link,
          minia,
          title,
          description,
          isFree,
          playlistId: addedPlaylistId,
        });
      } else {
        await addVideo({ link, minia, title, description, isFree });
      }

      setLink("");
      setMinia("");
      setTitle("");
      setDescription("");
      setIsFree(false);
      setPlaylistName("");
      setSelectedPlaylistId("");

      updateVideos();
    } catch (error) {
      console.error("Error adding video or playlist:", error);
    }
  };

  return (
    <div className="container-add-video">
      <div className="add-video-form">
        <h2>Add Video</h2>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label>
                Title of video:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title of video"
                />
              </label>
            </li>
            <li>
              <label>
                Link of video:
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v="
                />
              </label>
            </li>
            <li>
              <label>
                Minia of video:
                <input
                  type="text"
                  value={minia}
                  onChange={(e) => setMinia(e.target.value)}
                  placeholder="https://www.youtube.com/embed/"
                />
              </label>
            </li>
            <li>
              <label>
                Description of video:
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description of video"
                />
              </label>
            </li>
            <li>
              <label>
                Video is free:
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                />
              </label>
            </li>
            <li>
              <label>
                Playlist:
                <select
                  value={selectedPlaylistId}
                  onChange={(e) => setSelectedPlaylistId(e.target.value)}
                >
                  <option value="">Select Playlist</option>
                  {playlists.map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>
                      {playlist.title}
                    </option>
                  ))}
                </select>
              </label>
            </li>
            <li>
              <button type="submit">Add Video</button>
            </li>
          </ul>
        </form>
      </div>
      <div className="video-preview">
        <div className="videos-card">
          <h3>{title}</h3>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img
              src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg"
              alt="Logo YouTube"
              height="150"
            />
          </a>{" "}
          <p>{description}</p>
          <br />
        </div>
      </div>
      <p>Is Free: {isFree ? "Yes" : "No"}</p>
    </div>
  );
}
