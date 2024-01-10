import React, { useState } from "react";

export default function AddCategory() {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
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
    <div className="container-add-category">
      <div className="add-category-form">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label>
                Name of category :
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name of category"
                />
              </label>
            </li>
            <li>
              <input type="submit" value="Add Category" />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
