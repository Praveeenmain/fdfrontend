import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = Cookies.get("jwt_token");
            if (!token) {
                setError("Unauthorized: Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("https://fdback.onrender.com/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (err) {
                setError("Failed to fetch profile details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div className="profile-container loading">Loading...</div>;
    if (error) return <div className="profile-container error">{error}</div>;

    return (
        <div className="profile-container">
            <h2 className="profile-heading">User Profile</h2>
            <div className="profile-info">
                <p className="profile-detail"><strong>Email:</strong> {profile?.email}</p>
                <p className="profile-detail"><strong>User ID:</strong> {profile?._id}</p>
            </div>
        </div>
    );
};

export default Profile;
