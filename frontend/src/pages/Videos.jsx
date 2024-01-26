import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import "../styles/admin/Content.scss";
import { VideoContext } from "../context/VideoContext";
import { useAuth } from "../context/AuthContext";

export default function Content() {
  const { videos } = useContext(VideoContext);
  const { user } = useAuth();

  const filteredVideos = videos.filter((video) =>
    user ? true : video.is_free
  );

  return (
    <>
      <NavBar />
      <main>
        <div className="videos">
          <h1>Videos </h1>
          <div className="videos-card">
            {filteredVideos.map((video) => (
              <div key={video.id}>
                <h3>{video.title}</h3>
                <a href={video.link} target="_blank" rel="noopener noreferrer">
                  <img src={video.minia} alt={video.title} height="150" />
                </a>
                <p>{video.description}</p>
                <br />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
