import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContextDefinition";

const USER_STORAGE_KEY = "petlove_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    return !!savedUser && savedUser !== "undefined" && savedUser !== "null";
  });
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (!savedUser || savedUser === "undefined" || savedUser === "null") {
      return null;
    }
    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      return null;
    }
  });

  // Clean up invalid data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (savedUser === "undefined" || savedUser === "null") {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem("petlove_token");
    }
  }, []);

  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem("petlove_token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
