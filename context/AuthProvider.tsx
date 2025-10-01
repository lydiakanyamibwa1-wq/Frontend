import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Login function
    const login = async (email: string, password: string): Promise<User> => {
        const res = await fetch("http://localhost:7000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to login");
        }

        const data = await res.json();

        const loggedInUser: User = {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            role: data.user.role,
        };

        // Save user and token
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("token", data.token);

        return loggedInUser;
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    // Register function
    const register = async (username: string, email: string, password: string) => {
        const res = await fetch("http://localhost:7000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to register");
        }

        const data = await res.json();

        const newUser: User = {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            role: data.user.role || "user",
        };

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("token", data.token);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
