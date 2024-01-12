import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Settings.scss";

function Settings() {
  const { user, editUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    pseudoname: user?.pseudoname || "",
    email: user?.mail || "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      pseudoname: user?.pseudoname || "",
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
      const requiredFields = ["firstname", "lastname", "pseudoname"];
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

  return (
    <>
      <NavBar />
      <div className="big-setting-container">
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
              className={`settings-label ${
                errors.lastname ? "error-input" : ""
              }`}
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
              className={`settings-label ${
                errors.pseudoname ? "error-input" : ""
              }`}
            >
              Pseudoname:
              <input
                type="text"
                name="pseudoname"
                value={formData.pseudoname}
                onChange={handleChange}
              />
            </label>
            {errors.pseudoname && (
              <p className="error-message">{errors.pseudoname}</p>
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
          </form>

          {errors.general && <p className="error-message">{errors.general}</p>}
          {success && <p>{success}</p>}
        </div>
      </div>
    </>
  );
}

export default Settings;
