import React, { useContext, useState } from "react";
import { VideoContext } from "../context/VideoContext";
import NavBar from "../components/NavBar";
import "../styles/Playlists.scss";

function Playlists() {
  const { playlists, videos, playlistsMap } = useContext(VideoContext);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const handlePlaylistChange = (e) => {
    setSelectedPlaylist(e.target.value);
  };

  const filteredVideoIds = selectedPlaylist
    ? playlistsMap
        .filter((map) => map.playlists_id === parseInt(selectedPlaylist, 10))
        .map((map) => map.videos_id)
    : videos.map((video) => video.id);

  const filteredVideos = videos.filter((video) =>
    filteredVideoIds.includes(video.id)
  );

  return (
    <>
      <NavBar />
      <div className="Playlists">
        <h2>All videos</h2>
        <div className="filter-dropdown">
          <label htmlFor="playlist-filter">Filter by playlist:</label>
          <select
            id="playlist-filter"
            onChange={handlePlaylistChange}
            value={selectedPlaylist}
          >
            <option value="">All playlists</option>
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.title}
              </option>
            ))}
          </select>
        </div>
        <ul className="videos-grid">
          {filteredVideos.map((video) => (
            <li key={video.id} className="video-item">
              <h3>{video.title}</h3>
              <a href={video.link} target="_blank" rel="noopener noreferrer">
                <img
                  src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg"
                  alt="Logo YouTube"
                  height="30"
                />
              </a>
              <p>{video.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Playlists;
