// context/AuthContext.tsx
import { createContext } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

// ✅ Export the interface so it can be imported elsewhere
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => { throw new Error("login function not implemented"); },
  logout: () => { },
  register: async () => { },
});

// ✅ Remove useAuth from here since you have it in a separate file