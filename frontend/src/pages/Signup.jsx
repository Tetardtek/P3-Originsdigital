// Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    pseudoname: "",
    birthdate: "",
    mail: "",
    password: "",
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        localStorage.setItem("token", token);

        logout();

        navigate("/");
      } else {
        console.error("Error during signup:", response.statusText);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="auth-form">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <label>
            First Name:
            <input
              type="text"
              name="firstname"
              value={user.firstname}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastname"
              value={user.lastname}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Pseudo:
            <input
              type="text"
              name="pseudoname"
              value={user.pseudoname}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="mail"
              value={user.mail}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Birthdate:
            <input
              type="date"
              name="birthdate"
              value={user.birthdate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
