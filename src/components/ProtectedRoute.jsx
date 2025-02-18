import React from 'react'
import { Navigate } from "react-router-dom";
import { Loader } from './Loader';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn === null) return <Loader />
    return isLoggedIn ? children : <Navigate to="/" replace />;
};
