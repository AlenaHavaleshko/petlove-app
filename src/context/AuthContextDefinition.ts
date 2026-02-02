import { createContext } from "react";

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
