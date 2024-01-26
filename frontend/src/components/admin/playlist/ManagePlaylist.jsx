import React, { useContext } from "react";
import { VideoContext } from "../../../context/VideoContext";

export default function ManagePlaylist() {
  const { videos, playlists, playlistsMap, deleteVideo } =
    useContext(VideoContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Playlist ID</th>
          <th>Playlist Link</th>
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
        {playlistsMap.map((playlistMap) => {
          const video = videos.find((v) => v.id === playlistMap.videos_id);
          const playlist = playlists.find(
            (p) => p.id === playlistMap.playlists_id
          );

          if (video && playlist) {
            return (
              <tr key={playlistMap.id}>
                <td>{playlist.id}</td>
                <td>{playlist.link}</td>
                <td>{playlist.title}</td>
                <td>{playlist.description}</td>
                <td>{video.id}</td>
                <td>{video.link}</td>
                <td>{video.title}</td>
                <td>{video.description}</td>
                <td>{video.is_free ? "Yes" : "No"}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      deleteVideo(video.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    </table>
  );
}
