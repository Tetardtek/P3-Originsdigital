import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import Popup from "../components/Popup";

function Signup() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    nickname: "",
    birthdate: "",
    mail: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    nickname: "",
    birthdate: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasErrors = false;

    const requiredFields = [
      "firstname",
      "lastname",
      "nickname",
      "birthdate",
      "mail",
      "password",
      "confirmPassword",
    ];

    requiredFields.forEach((field) => {
      if (!user[field].trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "Ce champ est requis",
        }));
        hasErrors = true;
      }
    });

    if (user.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long",
      }));
      hasErrors = true;
    }

    if (user.password !== user.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      hasErrors = true;
    }

    if (!emailRegex.test(user.mail)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

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

        setShowSignupPopup(true);
      } else {
        const responseData = await signupResponse.json();
        if (
          signupResponse.status === 400 &&
          responseData.message === "Email already registered."
        ) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email already registered",
          }));
        } else {
          console.error("Error during signup:", signupResponse.statusText);
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: "Error during signup",
          }));
        }
      }
    } catch (catchedError) {
      console.error("Error during signup:", catchedError);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "An unexpected error occurred",
      }));
    }
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className="auth-form">
        <h2>Signup</h2>
        {errors.general && <p className="error-message">{errors.general}</p>}
        <form onSubmit={handleSignup} className="form-container">
          <label>
            Firstname:
            <input
              type="text"
              name="firstname"
              value={user.firstname}
              onChange={handleInputChange}
            />
          </label>
          {errors.firstname && (
            <p className="error-message">{errors.firstname}</p>
          )}

          <label>
            Lastname:
            <input
              type="text"
              name="lastname"
              value={user.lastname}
              onChange={handleInputChange}
            />
          </label>
          {errors.lastname && (
            <p className="error-message">{errors.lastname}</p>
          )}

          <label>
            Nickname:
            <input
              type="text"
              name="nickname"
              value={user.nickname}
              onChange={handleInputChange}
            />
          </label>
          {errors.nickname && (
            <p className="error-message">{errors.nickname}</p>
          )}

          <label>
            Mail:
            <input
              type="email"
              name="mail"
              value={user.mail}
              onChange={handleInputChange}
              className={errors.email && "error-input"}
            />
          </label>
          {errors.email && <p className="error-message">{errors.email}</p>}

          <label>
            Birthdate:
            <input
              type="date"
              name="birthdate"
              value={user.birthdate}
              onChange={handleInputChange}
            />
          </label>
          {errors.birthdate && (
            <p className="error-message">{errors.birthdate}</p>
          )}

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className={errors.password && "error-input"}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </label>

          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword && "error-input"}
            />
          </label>
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}

          <button type="submit">Signup</button>
          {showSignupPopup && (
            <Popup
              onClose={() => setShowSignupPopup(false)}
              onConfirm={() => navigate("/login")}
            >
              <p>Your account has been successfully created</p>
            </Popup>
          )}
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
