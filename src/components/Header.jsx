import React from 'react'
import './Header.css'
import Navbar from './Navbar.jsx'
import Searchbar from './Searchbar.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiUser } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import heroImg from '../assets/creamlogo.png'
import { FiLogOut } from 'react-icons/fi'

const Header = () => {
    const { cartCount } = useCart()
    const { currentUser, isAdmin, logout } = useAuth()

    const siteSettings = JSON.parse(localStorage.getItem('siteSettings') || '{"status":"open","promo":""}');

    return (
        <>
            {siteSettings.promo && (
                <div className="promo-banner" style={{ background: 'var(--primary-color)', color: 'white', textAlign: 'center', padding: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {siteSettings.promo}
                </div>
            )}
            <header>
                <div className="logo">
                    <Link to="/">
                        <img src={heroImg} alt="logo" />
                    </Link>
                </div>

                <Searchbar />
                
                <div className="header-actions">
                    <ThemeToggle />
                    <Link to="/cart" className='cart-btn'>
                        <FiShoppingCart />
                        {cartCount > 0 && <span className='cart-count'>{cartCount}</span>}
                    </Link>
                    <Link to="/wishlist" className='btn-icon'>
                        <FiHeart />
                    </Link>
                    
                    {currentUser ? (
                        <div className="user-profile">
                            <span className="user-name">{currentUser.displayName || 'User'}</span>
                            <div className="user-links" style={{ display: 'flex', gap: '10px' }}>
                                <Link to="/orders" className="orders-link" title="My Orders">Orders</Link>
                                <Link to="/my-messages" className="messages-link" title="My Inquiries">Inquiries</Link>
                                {isAdmin && <Link to="/admin" className="admin-link" title="Admin Dashboard">Admin</Link>}
                            </div>
                            <button onClick={logout} className="logout-btn" title="Logout">
                                <FiLogOut />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className='btn-icon' title="Login">
                            <FiUser />
                        </Link>
                    )}
                </div>

                <Navbar />
            </header>
        </>
    )
}

export default Header