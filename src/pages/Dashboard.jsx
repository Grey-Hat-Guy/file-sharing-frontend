import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const API_URL = import.meta.env.VITE_APP_URL;
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/files/my-files`, {
                withCredentials: true
            });
            setFiles(response.data);
        } catch (error) {
            toast.error("Failed to fetch files!");
        }
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.warning("Please select a file to upload.")
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setUploading(true);

            const response = await axios.post(`${API_URL}/api/files/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            toast.success(response.data.message);
            fetchFiles();
        } catch (error) {
            toast.error("File upload failed.")
        } finally {
            setUploading(false);
        }
    }
    return (
        <div className="container mx-auto p-4">
            <ToastContainer autoClose={2500} />
            <h2 className="text-2xl font-bold text-blue mb-4">Dashboard</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700">Your Files</h3>
                <div className='mt-4'>
                    <input type="file" onChange={handleFileChange} className='mb-2' />
                    <button onClick={handleUpload} className="bg-blue text-white p-2 rounded hover:bg-mint">
                        {uploading ? "Uploading..." : "Upload File"}
                    </button>

                    <h3 className="mt-6 text-lg font-semibold">Uploaded Files</h3>
                    {files.length > 0 ? (
                        <ul>
                            {files.map((file) => (
                                <li key={file._id} className="flex justify-between items-center bg-gray-100 p-2 mt-2 rounded">
                                    <span>{file.filename}</span>
                                    <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => generateLink(file._id)}>
                                        Generate Link
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : <p className='mt-2'>No files</p>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;