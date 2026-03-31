import React from 'react'
import './Body.css'
import Slideswiper from './components/Slideswiper.jsx'
import Filter from './components/Filter.jsx'
import Herosec from './components/Herosec.jsx'


const Body = () => {
    return (
        <>
            <Herosec />
            <div className='container'>
                <Filter />
                <div className='cards'>
                    <Slideswiper />

                </div>
            </div>
        </>
    )
}

export default Body