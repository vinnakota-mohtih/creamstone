import React from 'react'
import './Header.css'
import Navbar from './Navbar.jsx'
import Searchbar from './Searchbar.jsx'
import heroImg from '../assets/creamlogo.png'
const Header = () => {
    return (
        <>

            <header>
                <div className="logo">
                    <img src={heroImg} alt="logo" />
                </div>

                <Searchbar />
                <button className='btn' link="/registers"> register/signin</button>

                <button className='btn'> wishlist</button>
                <Navbar />

            </header>
        </>
    )
}

export default Header