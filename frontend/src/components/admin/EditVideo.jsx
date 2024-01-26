import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { VideoContext } from "../../context/VideoContext";

function EditVideo({ video, onVideoUpdated }) {
  const { updateVideo, updatePlaylistMap, playlists, playlistsMap } =
    useContext(VideoContext);
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [link, setLink] = useState(video.link);
  const [isFree, setIsFree] = useState(video.is_free);
  const [formVisible, setFormVisible] = useState(false);

  const playlistMap = playlistsMap.find((pm) => pm.videos_id === video.id);
  const [playlistId, setPlaylistId] = useState(playlistMap.playlists_id);

  const handleSubmit = async () => {
    const updatedVideo = await updateVideo(video.id, {
      title,
      description,
      link,
      is_free: isFree,
    });

    if (playlistId !== playlistMap.playlists_id) {
      await updatePlaylistMap(playlistMap.id, { playlists_id: playlistId });
    }

    onVideoUpdated(updatedVideo);
  };

  const handleToggleForm = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div>
      <button type="button" onClick={handleToggleForm}>
        Edit video
      </button>
      {formVisible && (
        <form onSubmit={handleSubmit}>
          <br />
          Edit playlist :
          <select
            value={playlistId}
            onChange={(e) => setPlaylistId(e.target.value)}
          >
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.title}
              </option>
            ))}
          </select>
          Edit title :
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <br />
          Edit description :
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />{" "}
          <br />
          Edit link :
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />{" "}
          <br />
          Edit isFree :
          <input
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
          />{" "}
          <br />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
}

EditVideo.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    is_free: PropTypes.number.isRequired,
  }).isRequired,
  onVideoUpdated: PropTypes.func,
};

EditVideo.defaultProps = {
  onVideoUpdated: () => {},
};

export default EditVideo;
