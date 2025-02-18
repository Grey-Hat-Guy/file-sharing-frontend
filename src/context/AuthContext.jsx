import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_APP_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API_URL}/api/auth-check`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Not authenticated");

                const data = await response.json();
                setIsLoggedIn(data.isLoggedIn);
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkAuth();
    }, [isLoggedIn]);
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);