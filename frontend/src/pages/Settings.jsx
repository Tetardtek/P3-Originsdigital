import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/NavBar";
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
  const [error, setError] = useState(null);
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
  }, [user]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const updatedFields = {};

      if (formData.firstname !== "" && formData.firstname !== user?.firstname) {
        updatedFields.firstname = formData.firstname;
      }

      if (formData.lastname !== "" && formData.lastname !== user?.lastname) {
        updatedFields.lastname = formData.lastname;
      }

      if (
        formData.pseudoname !== "" &&
        formData.pseudoname !== user?.pseudoname
      ) {
        updatedFields.pseudoname = formData.pseudoname;
      }

      if (formData.email !== "" && formData.email !== user?.mail) {
        updatedFields.email = formData.email;
      }

      if (formData.newPassword && formData.newPassword.trim() !== "") {
        updatedFields.newPassword = formData.newPassword.trim();
      }

      if (formData.currentPassword && formData.currentPassword.trim() !== "") {
        updatedFields.currentPassword = formData.currentPassword.trim();
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
      setError(null);
    } catch (errorCaught) {
      setSuccess(null);
      setError("Un champs obligatoire n'a pas été remplis");
    }
  }

  return (
    <>
      <Navbar />
      <div className="settings-container">
        <h2>Settings</h2>
        <form className="settings-list-container" onSubmit={handleSubmit}>
          <label className="settings-label">
            Email:
            <div>
              <input
                type="text"
                name="email"
                value={formData.email || ""}
                readOnly
              />
            </div>
          </label>
          <label className="settings-label">
            First Name:
            <input
              type="text"
              name="firstname"
              value={formData.firstname || ""}
              onChange={handleChange}
            />
          </label>
          <label className="settings-label">
            Last Name:
            <input
              type="text"
              name="lastname"
              value={formData.lastname || ""}
              onChange={handleChange}
            />
          </label>
          <label className="settings-label">
            Pseudoname:
            <input
              type="text"
              name="pseudoname"
              value={formData.pseudoname || ""}
              onChange={handleChange}
            />
          </label>
          <label className="settings-label">
            Current Password:
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </label>
          <label className="settings-label">
            New Password:
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </label>
          <label className="settings-label">
            Confirm New Password:
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>

        {error && <p>Error: {error}</p>}
        {success && <p>{success}</p>}
      </div>
    </>
  );
}

export default Settings;
