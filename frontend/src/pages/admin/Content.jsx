import React, { useContext } from "react";
import NavBarAdmin from "../../components/admin/NavBarAdmin";
import { VideoContext } from "../../context/VideoContext";
import "../../styles/admin/Content.scss";

export default function Content() {
  const { videos, deleteVideo } = useContext(VideoContext);

  return (
    <>
      <NavBarAdmin />
      <main>
        <div className="videos">
          <h1>Videos Panel</h1>
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
                <p>Video ID : {video.id}</p>
                <br />
                <button type="button" onClick={() => deleteVideo(video.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
