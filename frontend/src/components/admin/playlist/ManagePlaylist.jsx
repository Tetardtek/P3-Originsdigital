import React, { useState, useEffect } from "react";

export default function ManagePlaylist() {
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [video, setVideos] = useState([]);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlists_videos/`
      );
      const data = await response.json();
      setPlaylistVideos(data);
    };
    fetchPlaylistVideos();
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/videos/`)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  const deletePlaylistVideo = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlists_videos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete playlist video.");
      }
      setPlaylistVideos(
        playlistVideos.filter((playlistVideo) => playlistVideo.id !== id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Playlist ID</th>
          <th>Playlist Title</th>
          <th>Playlist Link</th>
          <th>Playlist Description</th>
          <th>Video ID</th>
          <th>Video Title</th>
          <th>Video Link</th>
          <th>Video Description</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {playlistVideos.map((playlistVideo) => (
          <tr key={playlistVideo.id}>
            <td>{playlistVideo.playlists_id}</td>
            <td>{playlistVideo.title}</td>
            <td>{playlistVideo.link}</td>
            <td>{playlistVideo.description}</td>
            <td>{playlistVideo.videos_id}</td>
            <td>{video.title}</td>
            <td>{video.link}</td>
            <td>{video.description}</td>
            <td>
              <button
                type="button"
                onClick={() => deletePlaylistVideo(playlistVideo.id)}
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
