import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwtToken = localStorage.getItem("token");

        if (jwtToken) {
          const decodedPayload = jwtDecode(jwtToken);

          if (decodedPayload.user) {
            const userDataResponse = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/users/${
                decodedPayload.user
              }`
            );

            if (userDataResponse.ok) {
              const userData = await userDataResponse.json();
              setUser(userData);
            } else {
              console.error(
                "Error fetching user data:",
                userDataResponse.statusText
              );
            }
          }
        }
      } catch (error) {
        console.error("Error decoding token or fetching user data:", error);
        setAuthError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  const login = async (credentials) => {
    try {
      const loginResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const responseData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(responseData.message);
      }

      const { token } = responseData;

      localStorage.setItem("token", token);

      try {
        const decodedPayload = jwtDecode(token);
        const userDataResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${decodedPayload.user}`
        );

        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          setUser(userData);
          return "Login successful";
        }
        console.error("Error fetching user data:", userDataResponse.statusText);
        throw new Error("Error fetching user data");
      } catch (error) {
        console.error("Error decoding token or fetching user data:", error);
        setAuthError(error);
        throw new Error("Error decoding token or fetching user data");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAuthError(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const editUser = async (updatedFields) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedFields),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          ...updatedUser.user,
        }));
        return "User updated successfully";
      }
      if (response.status === 400) {
        console.error("Bad Request:", response.statusText);
        setAuthError(new Error("Bad Request"));
        throw new Error("Bad Request");
      } else if (response.status === 401) {
        console.error("Unauthorized:", response.statusText);
        setAuthError(new Error("Unauthorized"));
        throw new Error("Unauthorized");
      } else {
        console.error("Error updating user:", response.statusText);
        setAuthError(new Error(response.statusText));
        throw new Error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setAuthError(error);
      throw new Error("An error occurred during user update");
    }
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail: email }),
        }
      );

      if (response.ok) {
        return "Password reset email sent successfully";
      }
      const data = await response.json();
      throw new Error(data.message || "Error sending password reset email");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw new Error(
        "An error occurred while sending the password reset email"
      );
    }
  };

  const authContextValue = useMemo(() => {
    return {
      user,
      loading,
      error: authError,
      login,
      logout,
      editUser,
      sendPasswordResetEmail,
    };
  }, [user, loading, authError, login, logout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
