import React, { useContext, useState } from "react";
import { VideoContext } from "../../context/VideoContext";

export default function AddVideo() {
  const { addVideo, playlists, setPlaylists } = useContext(VideoContext);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [isFree, setIsFree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo({ link, title, description, isFree })
      .then(() => {
        setLink("");
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Failed to add video.", error);
      });
  };

  return (
    <div className="container-add-video">
      <div className="add-video-form">
        <h2>Add Video</h2>
        <form>
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
              <label>
                Playlist of video:
                <select
                  value={playlists.title}
                  onChange={(e) => setPlaylists(e.target.value)}
                >
                  {playlists.map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>
                      {playlist.title}
                    </option>
                  ))}
                </select>
              </label>
            </li>
            <li>
              <button onClick={handleSubmit} type="submit">
                Add Video
              </button>
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
              height="30"
            />
          </a>{" "}
          <p>{description}</p>
          <br />
        </div>
      </div>
      <p>Is Free : {isFree ? "Yes" : "No"}</p>
    </div>
  );
}
