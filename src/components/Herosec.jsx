import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Herosec.css'
import { Link } from 'react-router-dom'
const Herosec = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="hero">
                <div className="hero-content">
                    <h1 className='hero-header'>Welcome to Creamstone <br></br>Ice-Cream Concepts</h1>
                    <p className='hero-para'>We have a wide variety of ice creams for you to choose from </p>
                    <Link to="/Product"><button className='btn' >Shop now</button></Link>
                </div>
            </div>
        </>
    )
}

export default Herosec