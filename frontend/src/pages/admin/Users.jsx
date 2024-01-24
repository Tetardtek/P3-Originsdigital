import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";

export default function Users() {
  const [users, setUsers] = useState([]);
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
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <h1>Origin's Digital users Panel</h1>

        <div className="users">
          {users.map((user) => (
            <div className="user" key={user.id}>
              <h3>{user.pseudoname}</h3>
              <p>
                Firstname : {user.firstname}
                <br />
                Lastname : {user.lastname}
                <br />
                Email : {user.mail}
                <br />
                Birthdate : {user.birthdate}
                <br />
                Logdate : {user.logdate}
                <br />
                Role : {user.roles_id}
                <br />
              </p>
              <button type="button" onClick={() => deleteUsers(user.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
