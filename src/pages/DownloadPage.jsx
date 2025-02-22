import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader } from '../components/Loader';

const DownloadPage = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const { token } = useParams();
    const API_URL = import.meta.env.VITE_APP_URL;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoggedIn === false) {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
        setLoading(false);
    }, [isLoggedIn, navigate]);

    const downloadFile = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/files/download/${token}`, {
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
            toast.error("Failed to download file");
        }
    };

    if (loading) return <Loader />;

    return isLoggedIn ? (
        <div className="flex items-center justify-center h-screen bg-[linear-gradient(135deg,#FFDEE9_0%,#B5FFFC_100%)]">
            <div className="bg-white p-10 rounded-lg shadow-xl text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Download Your File</h2>
                <button
                    onClick={downloadFile}
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                >
                    Download
                </button>
            </div>
        </div>
    ) : (
        <Loader />
    );
};

export default DownloadPage;