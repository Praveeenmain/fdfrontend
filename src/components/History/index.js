import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./index.css"; // Add CSS for styling

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = Cookies.get("jwt_token"); // Get JWT token from cookies
                if (!token) {
                    setError("Unauthorized access. Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("https://fdback.onrender.com/history", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setHistory(response.data);
                console.log("Fetched history:", response.data); // Console log history
            } catch (err) {
                setError("Failed to fetch history.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="history-container">
            <h2>History</h2>

            {loading && <p>Loading history...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && history.length === 0 && <p>No history available.</p>}

            {!loading && !error && history.length > 0 && (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>File Name</th>
                            <th>Prediction</th>
                            <th>Confidence</th>
                            <th>User Email</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <Link to={`/image/${item._id}`}>
                                        <img
                                            src={`data:${item.mimeType};base64,${item.image}`}
                                            alt="Logo"
                                            className="history-image"
                                        />
                                    </Link>
                                </td>
                                <td>{item.fileName}</td>
                                <td>{item.prediction}</td>
                                <td>{item.confidence}</td>
                                <td>{item.userEmail}</td>
                                <td>{new Date(item.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default History;
