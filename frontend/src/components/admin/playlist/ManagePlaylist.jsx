import React, { useState, useEffect } from "react";

export default function ManagePlaylist() {
  const [playlists, setPlaylists] = useState([]);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlists/`
      );
      const data = await response.json();
      setPlaylists(data);
    };
    fetchPlaylist();
  }, []);

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
    const fetchVideos = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos/`
      );
      const data = await response.json();
      setVideos(data);
    };
    fetchVideos();
  }, []);

  const deletePlaylist = async (id) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/playlists/${id}`, {
      method: "DELETE",
    });
    setPlaylists(playlists.filter((playlist) => playlist.id !== id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Playlist ID</th>
          <th>Playlist Title</th>
          <th>Playlist Description</th>
          <th>Video ID</th>
          <th>Video Link</th>
          <th>Video Title</th>
          <th>Video Description</th>
          <th>Free Video</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {playlists.map((playlist) => {
          const matchingPlaylistVideo = playlistVideos.find(
            (playlistVideo) => playlistVideo.id === playlist.playlists_id
          );
          const matchingVideo = videos.find(
            (video) => video.id === playlist.videos_id
          );

          const playlistTitle = matchingPlaylistVideo
            ? matchingPlaylistVideo.title
            : null;
          const playlistDescription = matchingPlaylistVideo
            ? matchingPlaylistVideo.description
            : null;

          return (
            <React.Fragment key={playlist.id}>
              {matchingVideo && (
                <tr>
                  <td>{playlist.playlists_id}</td>
                  <td>{playlistTitle}</td>
                  <td>{playlistDescription}</td>
                  <td>{matchingVideo.id}</td>
                  <td>{matchingVideo.link}</td>
                  <td>{matchingVideo.title}</td>
                  <td>{matchingVideo.description}</td>
                  <td>{matchingVideo.is_free ? "Yes" : "No"}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deletePlaylist(playlist.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
