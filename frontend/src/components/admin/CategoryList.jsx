import React, { useState, useEffect } from "react";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

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
    <>
      <h2>Category List</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <button type="button" onClick={() => deleteCategories(category.id)}>
              X
            </button>
            Category ID : {category.id} - {category.name}
          </li>
        ))}
      </ul>
    </>
  );
}
