import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({
    mail: "",
    password: "",
  });

  const { login, loginStatus } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const status = await login(credentials);

      if (status === "Login successful") {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="email"
              name="mail"
              value={credentials.mail}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Signup here</Link>
        </p>
        {loginStatus && <p>{loginStatus}</p>}
      </div>
    </>
  );
}
