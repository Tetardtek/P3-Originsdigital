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

  const [error, setError] = useState("");
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
      const signupResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (signupResponse.ok) {
        const data = await signupResponse.json();
        const { token } = data;

        localStorage.setItem("token", token);

        logout();

        navigate("/");
      } else {
        const responseData = await signupResponse.json();
        if (
          signupResponse.status === 400 &&
          responseData.message === "Email already registered."
        ) {
          setError("Email already registered");
        } else {
          console.error("Error during signup:", signupResponse.statusText);
          setError("Error during signup");
        }
      }
    } catch (catchedError) {
      console.error("Error during signup:", catchedError);
      setError("An unexpected error occurred");
    }
  };

  return (
    <>
      <NavBar />
      <div className="auth-form">
        <h2>Signup</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
