import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('app-theme') || 'light';
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <>
            <div className='navbar'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/product">Product</Link></li>
                    <li><Link to="/wishlist">Wishlist</Link></li>
                    <li><Link to="/Cart">Cart</Link></li>
                    <div className="theme-toggle-container">
                        <input
                            type="checkbox"
                            id="theme-toggle"
                            className="theme-checkbox"
                            checked={theme === 'dark'}
                            onChange={toggleTheme}
                        />
                        <label htmlFor="theme-toggle" className="theme-label">
                            <span className="theme-emoji">☀️</span>
                            <span className="theme-emoji">🌙</span>
                            <div className="theme-ball"></div>
                        </label>
                    </div>
                </ul>
            </div>
        </>
    )
}

export default Navbar