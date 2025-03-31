import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Siderpicture from "../../assets/side.png";
import "./index.css"; // Import CSS file

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://fdback.onrender.com/signup", { email, password });
            alert(res.data.message);
            navigate("/login"); // Redirect to login after successful signup
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-sidebar">
                <img src={Siderpicture} alt="Sidebar" className="sidebar-image" />
            </div>
            <div className="signup-content">
                <h2 className="signup-title">Signup</h2>
                {error && <p className="signup-error">{error}</p>}
                <form className="signup-form" onSubmit={handleSignup}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="signup-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="signup-input"
                    />
                    <button type="submit" className="signup-button">Signup</button>
                </form>
                <p className="signup-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;