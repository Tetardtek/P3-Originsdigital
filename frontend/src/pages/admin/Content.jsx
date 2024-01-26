import React, { useContext } from "react";
import NavBar from "../../components/NavBar";
import { VideoContext } from "../../context/VideoContext";
import "../../styles/admin/Content.scss";
import EditVideo from "../../components/admin/EditVideo";

export default function Content() {
  const { videos, deleteVideo, playlists, playlistsMap } =
    useContext(VideoContext);

  return (
    <>
      <NavBar />
      <main>
        <div className="videos">
          <h1>Videos Panel</h1>
          <div className="videos-card">
            {videos.map((video) => {
              const playlistMap = playlistsMap.find(
                (pm) => pm.videos_id === video.id
              );
              const playlist = playlists.find(
                (p) => p.id === playlistMap.playlists_id
              );

              return (
                <div key={video.id}>
                  <h3>{video.title}</h3>
                  <p>Playlist : {playlist.title}</p>
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={video.minia} alt={video.title} height="150" />
                  </a>{" "}
                  <p>{video.description}</p>
                  <p>
                    Video ID : {video.id} <br />
                    Free video : {video.is_free ? "Yes" : "No"}{" "}
                  </p>
                  <EditVideo video={video} />
                  <button type="button" onClick={() => deleteVideo(video.id)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
