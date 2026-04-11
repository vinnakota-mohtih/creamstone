import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import logo from '../assets/creamlogo.png'

const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div className='footer-left'>
                    <div>
                        <img src={logo} alt="" />
                        <p>Cream Stone</p>
                    </div>
                    <div className='footer-links'>
                        <p>Copyright © 2026 Ice Cream Shop. All rights reserved.</p>
                    </div>
                </div>
                <div className='footer-right'>
                    <div className='footer-right-links'>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer