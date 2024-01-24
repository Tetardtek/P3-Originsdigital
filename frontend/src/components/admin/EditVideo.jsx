import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { VideoContext } from "../../context/VideoContext";

function EditVideo({ video, onVideoUpdated }) {
  const { updateVideo } = useContext(VideoContext);
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [link, setLink] = useState(video.link);

  const handleSubmit = async () => {
    const updatedVideo = await updateVideo(video.id, {
      title,
      description,
      link,
    });

    onVideoUpdated(updatedVideo);
  };

  return (
    <form onSubmit={handleSubmit}>
      Edit title :
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      Edit description :
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      Edit link :
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <br />
      <button type="submit">Update</button>
    </form>
  );
}

EditVideo.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  onVideoUpdated: PropTypes.func.isRequired,
};

export default EditVideo;
