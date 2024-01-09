import React, { useState } from "react";

export default function AddVideo() {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoriesId, setCategoriesId] = useState("");
  const [isFree, setIsFree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            link,
            title,
            description,
            categories_id: categoriesId,
            is_free: isFree,
          }),
        }
      );
      if (!response.ok) {
        console.warn("Serveur response:", await response.text());
        return;
      }
      const data = await response.json();
      console.info("data", data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title of video :
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of video"
        />
      </label>
      <label>
        Link of video :
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link of video"
        />
      </label>
      <label>
        Description of video :
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description of video"
        />
      </label>
      <label>
        Category of video :
        <input
          type="text"
          value={categoriesId}
          onChange={(e) => setCategoriesId(e.target.value)}
          placeholder="Categories of video"
        />
      </label>
      <label>
        Video is free :
        <input
          type="checkbox"
          checked={isFree}
          onChange={(e) => setIsFree(e.target.checked)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
