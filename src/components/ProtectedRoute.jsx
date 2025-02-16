import React, { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { Loader } from './Loader';

export const ProtectedRoute = ({ children }) => {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];

            if (!token) {
                setIsAuth(false);
            } else {
                setIsAuth(true);
            }
        };

        checkAuth();
    }, []);

    if (isAuth === null) return <Loader />
    return isAuth ? children : <Navigate to="/" replace />;
};