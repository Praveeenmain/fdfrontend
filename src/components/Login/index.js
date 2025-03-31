import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Siderpicture from "../../assets/side.png";
import "./index.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://fdback.onrender.com/login", { email, password });
            Cookies.set("jwt_token", res.data.token, { expires: 1 });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="login-page">
            <div className="sider-picture">
                <img src={Siderpicture} alt="Side" className="sider-image" />
            </div>
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                {error && <p className="login-error">{error}</p>}
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-input"
                    />
                    <div className="password-container">
    <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="login-input password-input"
    />
    <button
        type="button"
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
    >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
</div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="login-link">
                    Don't have an account? <a href="/signup">Signup</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
