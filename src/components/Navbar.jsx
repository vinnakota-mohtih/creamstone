import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div className='navbar-container'>
                <ul className='navbar-links'>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/about"><li>About</li></Link>
                    <Link to="/contact"><li>Contact</li></Link>
                    <Link to="/product"><li>Products</li></Link>
                </ul>
            </div>
        </>
    )
}

export default Navbar