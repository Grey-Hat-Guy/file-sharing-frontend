import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const API_URL = import.meta.env.VITE_APP_URL;
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const handleLogout = async () => {
        try {
            await fetch(`${API_URL}/api/logout`, {
                method: "POST",
                credentials: "include",
            });

            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (isLoggedIn === null) {
        return null;
    }

    return (
        <nav className="bg-blue text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">FileShare</h1>
                <div>
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="mr-4 hover:text-mint">Dashboard</Link>
                            <button onClick={handleLogout} className="hover:text-mint">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="mr-4 hover:text-mint">Login</Link>
                            <Link to="/register" className="hover:text-mint">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;