import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

/* import content from "./admin/content"; */

export default function Content() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/content/`)
      .then((response) => response.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <div className="videos">
          <h1>Origin's Digital videos </h1>
          <div className="videos-card">
            {videos.map((video) => (
              <div key={video.id}>
                <h3>{video.title}</h3>
                <a href={video.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg"
                    alt="Logo YouTube"
                    height="30"
                  />
                </a>{" "}
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
