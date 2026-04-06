import React from 'react'
import './Footer.css'
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
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer