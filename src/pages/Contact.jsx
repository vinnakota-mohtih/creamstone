import React from "react";
import './Contact.css'
import { motion } from 'framer-motion'

const contact = () => {
    return (
        <>
            <div className="contact-container">

                <div className="contact">
                    <h1>Send us a message</h1>
                    <div className="contact-form">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="name" />
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="email" />
                        <label htmlFor="msg">Message</label>
                        <input className="msg" type="text" placeholder="message" />
                        <motion.button className="submit" whileHover={{ scale: 1.05, backgroundColor: "" }}
                            whileTap={{ scale: 0.9 }}>
                            submit</motion.button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default contact