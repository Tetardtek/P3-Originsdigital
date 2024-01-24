import React, { useEffect, useState } from "react";

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
    <table>
      <thead>
        {/* <h2>List of registered users</h2> */}
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Nickname</th>
          <th>Email</th>
          <th>Birthdate</th>
          <th>Logdate</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((currentUser) => {
          return (
            <tr key={currentUser.id}>
              <td>{currentUser.firstname}</td>
              <td>{currentUser.lastname}</td>
              <td>{currentUser.nickname}</td>
              <td>{currentUser.email}</td>
              <td>{currentUser.birthdate}</td>
              <td>{currentUser.logdate}</td>
              <td>{currentUser.roles_id}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
