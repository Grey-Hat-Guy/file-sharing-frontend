import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const isLoggedIn = !!sessionStorage.getItem('token');

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