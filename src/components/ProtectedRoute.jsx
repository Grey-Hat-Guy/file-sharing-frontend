import React, { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { Loader } from './Loader';

export const ProtectedRoute = ({ children }) => {
    const API_URL = import.meta.env.VITE_APP_URL;
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API_URL}/api/auth-check`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setIsAuth(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuth === null) return <Loader />
    return isAuth ? children : <Navigate to="/" replace />;
};
