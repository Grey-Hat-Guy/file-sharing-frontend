import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../components/Loader';

const DownloadPage = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useParams();
    const API_URL = import.meta.env.VITE_APP_URL;

    const [loading, setLoading] = useState(true);
    const [passwordRequired, setPasswordRequired] = useState(false);
    const [password, setPassword] = useState('');
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        if (isLoggedIn === false) {
            localStorage.setItem('redirectAfterLogin', location.pathname);
            navigate("/");
        } else {
            checkFileInfo();
        }
        setLoading(false);
    }, [isLoggedIn, navigate, location.pathname]);

    const checkFileInfo = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/files/info/${token}`, {
                withCredentials: true
            });
            setPasswordRequired(response.data.passwordProtected);
        } catch (error) {
            if (error.response && error.response.status === 410) {
                toast.error("This link has expired");
            } else {
                toast.error("File not found or expired");
            }
            navigate("/");
        } finally {
            setLoading(false);
        }
    }

    const downloadFile = async () => {
        try {
            setDownloading(true);
            const response = await axios.post(`${API_URL}/api/files/download/${token}`,
                { password },
                {
                    responseType: 'blob',
                    withCredentials: true
                });

            const filename = response.headers['content-disposition']?.split('filename=')[1] || 'downloaded-file';

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename.replace(/"/g, ''));
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            toast.error("Invalid Password or Failed to download file");
        } finally {
            setDownloading(false);
        }
    };

    if (loading) return <Loader />;

    return isLoggedIn ? (
        <div className="flex items-center justify-center h-screen bg-[linear-gradient(135deg,#FFDEE9_0%,#B5FFFC_100%)]">
            <ToastContainer autoClose={2000} />
            <div className="bg-white p-10 rounded-lg shadow-xl text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Download Your File</h2>

                {passwordRequired && (
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
                        placeholder="Enter Password"
                    />
                )}

                <button
                    onClick={downloadFile}
                    className={`px-6 py-3 w-full text-white font-medium rounded-lg shadow-md transition-all ${downloading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    disabled={downloading}
                >
                    {downloading ? "Downloading..." : "Download"}
                </button>
            </div>
        </div>
    ) : (
        <Loader />
    );
};

export default DownloadPage;