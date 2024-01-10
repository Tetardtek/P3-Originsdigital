import React, { useState, useEffect } from "react";

export default function AddVideo() {
  const [categories, setCategories] = useState([]);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoriesId, setCategoriesId] = useState("");
  const [isFree, setIsFree] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/`
      );
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

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
    <div className="container-add-video">
      <div className="add-video-form">
        <h2>Add Video</h2>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label>
                Title of video :
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
                Link of video :
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
                Description of video :
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
                Category of video :
                <select
                  value={categoriesId}
                  onChange={(e) => setCategoriesId(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </li>
            <li>
              <label>
                Video is free :
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                />
              </label>
            </li>
            <input type="submit" value="Submit" />
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
