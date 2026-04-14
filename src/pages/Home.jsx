import React from 'react'
import './Home.css'

import Herosec from '../components/Herosec.jsx'
import { motion } from 'framer-motion'
import Scroll from '../components/Scroll.jsx'


const Home = () => {
    return (
        <>
            <Herosec />
            <motion.div className='container'>
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    About us
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className='about'>Over a thousand years ago, Marco Polo returned to Italy
                    from the Far East with a recipe that closely resembled
                    what is now called sherbet. Historians estimate that this
                    recipe evolved into ice cream sometime in the 16th century,
                    Since then there is no looking back, ice cream has been
                    enjoyed through the ages across the world and in India.
                    Cream Stone was launched at Hyderabad in 2009, and
                    today it has become one of the most popular ice cream
                    parlours in India.

                </motion.p>
                <div className='outlets'>
                    <h2>our outlets</h2>
                    <p>Cream Stone started in Hyderabad in 2009 and expanded quickly.
                        Recent industry coverage reports the brand operates across 7 states, in ~34 cities with over 117 outlets nationwide.
                        Earlier listings show outlets in multiple major cities in South and West India (like Bangalore, Chennai, Vizag, Pune, Kochi, Coimbatore).
                    </p>
                </div>

                <Scroll />
            </motion.div>
        </>
    )
}

export default Home