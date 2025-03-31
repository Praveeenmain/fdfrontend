import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./index.css";

const LogoDetector = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPrediction(null);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a logo image.");
        const formData = new FormData();
        formData.append("logo", file);
        const token = Cookies.get("jwt_token");
        try {
            setLoading(true);
            const response = await axios.post("https://fdback.onrender.com/upload", formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });
            setPrediction(response.data);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to detect logo. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="logodetection-container">
            <div className="logodetection-card">
                <h2 className="logodetection-header">🔍 Fake/Real Logo Detector</h2>
                <label className="custom-file-upload">
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    Choose File
                </label>
                {preview && (
                    <div className="logodetection-preview">
                        <img src={preview} alt="Logo Preview" className="logodetection-preview-image" />
                    </div>
                )}
                <button onClick={handleUpload} disabled={loading} className="logodetection-upload-button">
                    {loading ?  "Analyzing": "Upload & Detect"}
                </button>
                {prediction && (
                    <div className="logodetection-result">
                        <h3 className="logodetection-result-header">Prediction: {prediction.prediction}</h3>
                        <p className="logodetection-result-confidence">Confidence: {prediction.confidence}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogoDetector;
