import React, { useState, useEffect } from "react";

export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);

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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/videos/`)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  const deleteVideos = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete video.");
      }

      setVideos(videos.filter((video) => video.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteCategories = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category.");
      }

      setCategories(categories.filter((category) => category.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Videos</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => {
          return (
            <tr key={category.id}>
              <td>
                <button
                  type="button"
                  onClick={() => deleteCategories(category.id)}
                >
                  X
                </button>
                {category.name}
              </td>
              <td>
                {videos
                  .filter((video) => video.categories_id === category.id)
                  .map((video) => (
                    <div key={video.id}>
                      {video.id} - {video.title}
                      <button
                        type="button"
                        onClick={() => deleteVideos(video.id)}
                      >
                        x
                      </button>
                    </div>
                  ))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
