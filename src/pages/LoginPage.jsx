import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const { setIsLoggedIn } = useAuth();
    const API_URL = import.meta.env.VITE_APP_URL;
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setIsLoggedIn(true);
                toast.success('Login successful!');

                const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');

                if (redirectAfterLogin) {
                    navigate(redirectAfterLogin);
                    localStorage.removeItem('redirectAfterLogin');
                } else {
                    navigate("/dashboard");
                }
            } else {
                toast.error(data.message || 'Login failed!');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[linear-gradient(135deg,#FFDEE9_0%,#B5FFFC_100%)]">
            <ToastContainer autoClose={2000} />
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-blue mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="border border-gray-300 p-2 w-full rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="border border-gray-300 p-2 w-full rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue text-white p-2 rounded w-full hover:bg-mint">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;