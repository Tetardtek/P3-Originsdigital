import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Popup from "../components/Popup";
import "../styles/Settings.scss";
import NavBar from "../components/NavBar";

function Settings() {
  const { user, editUser, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    nickname: user?.nickname || "",
    email: user?.mail || "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      nickname: user?.nickname || "",
      email: user?.mail || "",
    });
    setErrors({});
  }, [user]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    try {
      const updatedFields = {};
      const requiredFields = ["firstname", "lastname", "nickname"];
      let hasErrors = false;

      if (formData.currentPassword.trim()) {
        requiredFields.push("currentPassword");
      }

      requiredFields.forEach((field) => {
        if (!formData[field].trim()) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: "Ce champ est requis",
          }));
          hasErrors = true;
        } else {
          updatedFields[field] = formData[field].trim();
        }
      });

      if (formData.newPassword.trim() !== formData.confirmNewPassword.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          newPassword: "Les mots de passe ne correspondent pas",
          confirmNewPassword: "Les mots de passe ne correspondent pas",
        }));
        hasErrors = true;
      } else if (formData.newPassword.trim() !== "") {
        if (formData.newPassword.trim().length < 6) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            newPassword: "Le mot de passe doit comporter au moins 6 caractères",
          }));
          hasErrors = true;
        }

        updatedFields.newPassword = formData.newPassword.trim();
      }
      if (hasErrors) {
        setSuccess(null);
        return;
      }

      const updatedUser = await editUser({
        id: user.id,
        ...updatedFields,
      });

      setFormData((prevData) => ({
        ...prevData,
        ...updatedUser,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));

      setSuccess("Changement validé ✔");
      setErrors({});
      setShowPopup(true);
    } catch (errorCaught) {
      setSuccess(null);
      if (errorCaught.message === "Invalid current password") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          currentPassword: "Mot de passe actuel incorrect",
        }));
      } else {
        setErrors({ general: "Le mot de passe actuel n'est pas valide" });
      }
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");

      logout();

      setShowDeletePopup(true);
    } catch (error) {
      console.error("Erreur lors de la suppression du compte :", error);
      setErrors({
        general: "Une erreur s'est produite lors de la suppression du compte",
      });
    }
  };
  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
    navigate("/");
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <NavBar />
      <div className="settings-container">
        <h2>Settings</h2>
        <form className="settings-list-container" onSubmit={handleSubmit}>
          <label
            className={`settings-label ${
              errors.firstname ? "error-input" : ""
            }`}
          >
            First Name:
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </label>
          {errors.firstname && (
            <p className="error-message">{errors.firstname}</p>
          )}

          <label
            className={`settings-label ${errors.lastname ? "error-input" : ""}`}
          >
            Last Name:
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </label>
          {errors.lastname && (
            <p className="error-message">{errors.lastname}</p>
          )}

          <label
            className={`settings-label ${errors.nickname ? "error-input" : ""}`}
          >
            nickname:
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </label>
          {errors.nickname && (
            <p className="error-message">{errors.nickname}</p>
          )}

          <label
            className={`settings-label ${
              errors.currentPassword ? "error-input" : ""
            }`}
          >
            Current Password:
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </label>
          {errors.currentPassword && (
            <p className="error-message">{errors.currentPassword}</p>
          )}

          <label
            className={`settings-label ${
              errors.newPassword ? "error-input" : ""
            }`}
          >
            New Password:
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </label>

          <label
            className={`settings-label ${
              errors.confirmNewPassword ? "error-input" : ""
            }`}
          >
            Confirm New Password:
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
          </label>
          {errors.newPassword && (
            <p className="error-message">{errors.newPassword}</p>
          )}
          {errors.confirmNewPassword && (
            <p className="error-message">{errors.confirmNewPassword}</p>
          )}

          <button type="submit">Save Changes</button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>

          {errors.general && <p className="error-message">{errors.general}</p>}
          {success && <p>{success}</p>}

          {showDeletePopup && (
            <Popup onClose={handleCloseDeletePopup} confirmButtonText="Close">
              <p>Your account has been deleted successfully</p>
            </Popup>
          )}
        </form>

        {errors.general && <p className="error-message">{errors.general}</p>}
        {success && <p>{success}</p>}
        {showPopup && (
          <Popup onClose={closePopup}>
            <p>Password changed successfully!</p>
          </Popup>
        )}
      </div>
    </>
  );
}

export default Settings;
