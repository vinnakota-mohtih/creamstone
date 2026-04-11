import React from "react";
import './Wishlist.css'; // Reusing some cart styles for consistency
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist, toggleWishlist, addToCart } = useCart();
    const navigate = useNavigate();

    return (
        <motion.div
            className="cart-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="cart-container">
                <h1>My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your wishlist is empty</p>
                        <button className="btn" onClick={() => navigate('/product')}>Explore Flavors</button>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items" style={{ gridTemplateColumns: '1fr' }}>
                            <AnimatePresence>
                                {wishlist.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        className="cart-item"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                    >
                                        <img src={item.image} alt={item.title} />
                                        <div className="item-details">
                                            <h3>{item.title}</h3>
                                            <p className="item-category">{item.category}</p>
                                            <p className="item-price">₹{item.price}</p>
                                        </div>
                                        <div className="wishlist-actions" style={{ display: 'flex', gap: '10px' }}>
                                            <button className="btn" onClick={() => addToCart(item)}>Add to Cart</button>
                                            <button className="btn" style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }} onClick={() => toggleWishlist(item)}>Remove</button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Wishlist;
