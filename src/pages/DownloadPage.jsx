import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

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

    if (loading) return <h2>Checking authentication...</h2>;

    return isLoggedIn ? (
        <div>
            <h2>Download Your File</h2>
            <button onClick={downloadFile}>Download</button>
        </div>
    ) : null;
};

export default DownloadPage;