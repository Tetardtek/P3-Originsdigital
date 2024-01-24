import React, { useEffect, useState } from "react";
import "../../styles/User.scss";

export default function Users() {
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <section className="List-users">
      <h2>List of registered users</h2>
      <div className="title-users">
        <h3>Id</h3>
        <h3>Firstname</h3>
        <h3>Lastname</h3>
        <h3>Nickname</h3>
        <h3>mail</h3>
        <h3>Birthdate</h3>
        <h3>Logdate</h3>
        <h3>Role</h3>
      </div>
      {users?.map((currentUser) => {
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
          </div>
        );
      })}
    </section>
  );
}
