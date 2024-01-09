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

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    const fetchUserData = async () => {
      try {
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

      if (loginResponse.ok) {
        const { token } = await loginResponse.json();

        localStorage.setItem("token", token);

        try {
          const decodedPayload = jwtDecode(token);
          const userDataResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/${
              decodedPayload.user
            }`
          );

          if (userDataResponse.ok) {
            const userData = await userDataResponse.json();
            setUser(userData);
            return "Login successful";
          }
          console.error(
            "Error fetching user data:",
            userDataResponse.statusText
          );
          throw new Error("Error fetching user data");
        } catch (error) {
          console.error("Error decoding token or fetching user data:", error);
          throw new Error("Error decoding token or fetching user data");
        }
      } else {
        console.error("Error during login:", loginResponse.statusText);
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("An error occurred during login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const authContextValue = useMemo(() => {
    return { user, login, logout };
  }, [user, login, logout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth };
