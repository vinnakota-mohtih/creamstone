import React from 'react'
import './Herosec.css'
import { useNavigate } from 'react-router-dom'

const Herosec = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="hero">
                <div className="hero-content">
                    <h1>Welcome to our ice cream shop</h1>
                    <p>We have a wide variety of ice creams for you to choose from </p>
                    <button className='btn' onClick={() => navigate('/product')}>Shop now</button>
                </div>
            </div>
        </>
    )
}

export default Herosec