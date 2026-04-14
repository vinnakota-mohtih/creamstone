import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import './MyMessages.css';

const MyMessages = () => {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) {
            setLoading(false);
            return;
        }

        // Fetch messages for the current user
        const q = query(
            collection(db, 'messages'),
            where('userId', '==', currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            // Sort client-side to avoid index requirement
            list.sort((a, b) => {
                const aTime = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
                const bTime = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
                return bTime - aTime;
            });

            setMessages(list);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching my messages:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    if (loading) return <div className="loading">Loading your conversations...</div>;

    return (
        <motion.div 
            className="my-messages-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="messages-container">
                <h1>My Conversations</h1>
                <p className="subtitle">Track your enquiries and get expert support from our team.</p>

                {messages.length === 0 ? (
                    <div className="no-messages">
                        <p>You haven't sent any messages yet.</p>
                        <button className="btn" onClick={() => window.location.href='/contact'}>Send a Message</button>
                    </div>
                ) : (
                    <div className="conversations-list">
                        <AnimatePresence>
                            {messages.map(msg => (
                                <motion.div 
                                    key={msg.id}
                                    className="conversation-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    layout
                                >
                                    <div className="msg-header">
                                        <span className="msg-date">
                                            {msg.createdAt?.toDate?.()?.toLocaleString() || 'New Message'}
                                        </span>
                                        <span className={`msg-status ${msg.status || 'unread'}`}>
                                            {msg.status || 'Sent'}
                                        </span>
                                    </div>
                                    
                                    <div className="user-query">
                                        <div className="query-bubble">
                                            <strong>You:</strong>
                                            <p>{msg.message}</p>
                                        </div>
                                    </div>

                                    {msg.replies && msg.replies.map((reply, index) => (
                                        <div key={index} className={`reply-bubble ${reply.sender}`}>
                                            <strong>{reply.sender === 'admin' ? 'Support Agent' : 'You'}:</strong>
                                            <p>{reply.text}</p>
                                            <small>{new Date(reply.timestamp).toLocaleString()}</small>
                                        </div>
                                    ))}

                                    {!msg.replies && (
                                        <div className="waiting-reply">
                                            <p>Waiting for an administrator to reply...</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MyMessages;
