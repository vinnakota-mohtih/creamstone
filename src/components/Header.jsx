import React from 'react'
import './Header.css'
import Navbar from './Navbar.jsx'
import Searchbar from './Searchbar.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import heroImg from '../assets/creamlogo.png'

const Header = () => {
    const { cartCount } = useCart()

    return (
        <>
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
                </div>

                <Navbar />
            </header>
        </>
    )
}

export default Header