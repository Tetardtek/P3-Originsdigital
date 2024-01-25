import React, { useEffect, useState } from "react";
import "../../styles/User.scss";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ nickname: "" });

  const fetchUsersData = async () => {
    const fetchUsers = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const resultUsers = await fetchUsers.json();
    setUsers(resultUsers);
  };

  const deleteUsers = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.error("Serveur response:", await response.text());
        return;
      }
      setUsers(users.filter((currentUser) => currentUser.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleFilterChange = (e, field) => {
    setFilter({
      ...filter,
      [field]: e.target.value,
    });
  };

  const filteredUsers = users.filter((user) => {
    return Object.keys(filter).every((field) => {
      if (filter[field] === "") return true;
      return String(user[field])
        .toLowerCase()
        .includes(filter[field].toLowerCase());
    });
  });

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <section className="List-users">
      <h2>List of registered users</h2>
      <input
        className="filter-users"
        type="text"
        placeholder="Filter by Nickname"
        value={filter.nickname}
        onChange={(e) => handleFilterChange(e, "nickname")}
      />
      <div className="title-users">
        <h3>Id</h3>
        <h3>Firstname</h3>
        <h3>Lastname</h3>
        <h3>Nickname</h3>
        <h3>mail</h3>
        <h3>Birthdate</h3>
        <h3>Logdate</h3>
        <h3>Role</h3>
        <h3>Delete</h3>
      </div>
      {filteredUsers?.map((currentUser) => {
        return (
          <div className="body-users" key={currentUser.id}>
            <p>{currentUser.id}</p>
            <p>{currentUser.firstname}</p>
            <p>{currentUser.lastname}</p>
            <p>{currentUser.nickname}</p>
            <p>{currentUser.mail}</p>
            <p>{currentUser.birthdate}</p>
            <p>{currentUser.logdate}</p>
            <p>{currentUser.roles_id}</p>
            <button type="button" onClick={() => deleteUsers(currentUser.id)}>
              Delete
            </button>
          </div>
        );
      })}
    </section>
  );
}
