import React, { useState } from "react";
import { motion } from "framer-motion";
import './Sigin.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sigin() {
    const { register, getFriendlyError } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            setLoading(true);
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(getFriendlyError(err.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="sigin-container">
                <div className="sigin-card">
                    <h2>Sign Up</h2>
                    
                    {error && (
                        <div className="auth-error" style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <form className='sigin-input' onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input 
                            type="email" 
                            placeholder="Email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div style={{ position: 'relative', width: '100%' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button 
                                type="button"
                                className="pass" 
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute',width: '30%', height: '70%',  right: '9px', top: '35%', transform: 'translateY(-50%)', border: 'none', cursor: 'pointer', color: 'white' }}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <motion.button 
                            type="submit" 
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.05 }} 
                            whileTap={{ scale: loading ? 1 : 0.9 }}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </motion.button>
                        
                        <p style={{ marginTop: '15px', textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Sigin;