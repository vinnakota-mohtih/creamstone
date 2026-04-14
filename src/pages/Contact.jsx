import React, { useState } from "react";
import './Contact.css'
import { motion } from 'framer-motion'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState({ loading: false, success: false, error: "" });

    const handleChange = (e) => {
        const { placeholder, value } = e.target;
        // In the original JSX, inputs used placeholders as identifiers
        const fieldMap = { "name": "name", "email": "email", "message": "message" };
        const field = fieldMap[placeholder] || e.target.className === 'msg' ? 'message' : placeholder;
        
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ ...status, error: "Please fill all fields" });
            return;
        }

        try {
            setStatus({ loading: true, success: false, error: "" });
            await addDoc(collection(db, "messages"), {
                ...formData,
                createdAt: serverTimestamp()
            });
            setStatus({ loading: false, success: true, error: "" });
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
        } catch (err) {
            console.error("Error saving message:", err);
            setStatus({ loading: false, success: false, error: "Failed to send message. Try again later." });
        }
    };

    return (
        <>
            <div className="contact-container">
                <div className="contact">
                    <h1>Send us a message</h1>
                    
                    {status.error && <p style={{ color: "red", textAlign: "center" }}>{status.error}</p>}
                    {status.success && <p style={{ color: "green", textAlign: "center" }}>Message sent successfully!</p>}

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            placeholder="name" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            placeholder="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <label htmlFor="msg">Message</label>
                        <textarea 
                            className="msg" 
                            placeholder="message" 
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                        <motion.button 
                            type="submit"
                            className="submit" 
                            disabled={status.loading}
                            whileHover={{ scale: status.loading ? 1 : 1.05 }}
                            whileTap={{ scale: status.loading ? 1 : 0.9 }}
                        >
                            {status.loading ? "sending..." : "submit"}
                        </motion.button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact