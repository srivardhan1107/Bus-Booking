import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: "", email: "", password: "", role: "USER" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register(userData);
            navigate("/");
        } catch (err) {
            setError("Failed to register. Please try another email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join us to start booking buses.</p>
                
                {error && <div className="auth-error">{error}</div>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={userData.name} 
                            onChange={handleChange} 
                            required 
                            placeholder="John Doe" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={userData.email} 
                            onChange={handleChange} 
                            required 
                            placeholder="john@example.com" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={userData.password} 
                            onChange={handleChange} 
                            required 
                            placeholder="Create a strong password" 
                        />
                    </div>
                    <button type="submit" disabled={loading} className="auth-button">
                        {loading ? "Signing up..." : "Register"}
                    </button>
                </form>
                
                <div className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
