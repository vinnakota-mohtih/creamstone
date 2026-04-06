import React from 'react'
import './Header.css'
import Navbar from './Navbar.jsx'
import Searchbar from './Searchbar.jsx'
import heroImg from '../assets/creamlogo.png'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Header = () => {
    const navigate = useNavigate()
    const { cartCount, wishlist } = useCart()

    return (
        <>
            <header>
                <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <img src={heroImg} alt="logo" />
                </div>
                <Searchbar />

                <div className="header" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <Link to="/wishlist" style={{ textDecoration: 'none' }}>
                        <button className='btn' style={{ position: 'relative' }}>
                            wishlist
                            {wishlist.length > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    background: '#ff4d4d',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '2px 6px',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>
                                    {wishlist.length}
                                </span>
                            )}
                        </button>
                    </Link>
                    <Link to="/Cart" style={{ textDecoration: 'none' }}>
                        <button className='btn' style={{ position: 'relative' }}>
                            🛒 Cart
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    background: 'var(--primary-color)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '2px 6px',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </Link>
                </div>
                <Navbar />
            </header>
        </>
    )
}

export default Header