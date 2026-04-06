import React from 'react'
import './Scroll.css'
import ice1 from '../assets/Scroll/ice.jpeg'
import ice2 from '../assets/Scroll/ice2.jpg'
import ice3 from '../assets/Scroll/ice3.png'
import ice4 from '../assets/Scroll/ice4.png'
import ice5 from '../assets/Scroll/ice5.png'
import ice6 from '../assets/Scroll/ice6.png'

const Scroll = () => {
    const images = [ice1, ice2, ice3, ice4, ice5, ice6];
    return (
        <>
            <div className='scroll'>
                <div className="scroll-container">
                    <div className="scroll-track">
                        {[...images, ...images].map((img, i) => (
                            <div className="card1" key={i}>
                                <img className='card1' src={img} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Scroll