import React, { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { Loader } from './Loader';
import Cookies from 'js-cookie';

export const ProtectedRoute = ({ children }) => {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = Cookies.get("token");
            console.log(token);
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
