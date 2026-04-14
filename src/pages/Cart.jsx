import React from "react";
import './Cart.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, checkout } = useCart();
    const navigate = useNavigate();
    const [isCheckingOut, setIsCheckingOut] = React.useState(false);

    const siteSettings = JSON.parse(localStorage.getItem('siteSettings') || '{"status":"open","promo":"","deliveryFee":40}');

    const handleCheckout = async () => {
        try {
            setIsCheckingOut(true);
            // Simulate gathering shipping data for now
            const mockShipping = {
                address: "Sample Address",
                city: "Hyderabad",
                zip: "500001"
            };
            const orderId = await checkout(mockShipping);
            navigate('/orders');
        } catch (err) {
            alert(err.message || "Checkout failed");
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <motion.div 
            className="cart-page"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
        >
            <div className="cart-container">
                <h1>Shopping Cart</h1>
                
                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty</p>
                        <button className="btn" onClick={() => navigate('/product')}>Continue Shopping</button>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items">
                            <AnimatePresence>
                                {cart.map((item) => (
                                    <motion.div 
                                        key={item.id} 
                                        className="cart-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                    >
                                        <img src={item.image} alt={item.title} />
                                        <div className="item-details">
                                            <h3>{item.title}</h3>
                                            <p className="item-category">{item.category}</p>
                                            <p className="item-price">₹{item.price}</p>
                                        </div>
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                        <div className="item-total">
                                            ₹{item.price * item.quantity}
                                        </div>
                                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>×</button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        
                        <div className="cart-summary">
                            <h2>Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery</span>
                                <span>{siteSettings.deliveryFee === 0 ? 'FREE' : `₹${siteSettings.deliveryFee}`}</span>
                            </div>
                            <hr />
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{cartTotal + Number(siteSettings.deliveryFee)}</span>
                            </div>

                            {siteSettings.status === 'closed' ? (
                                <div className="store-closed-warning" style={{ background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    ⚠️ The store is currently closed. We are not accepting new orders.
                                </div>
                            ) : null}

                            <button 
                                className="checkout-btn" 
                                onClick={handleCheckout}
                                disabled={isCheckingOut || siteSettings.status === 'closed'}
                                style={{ opacity: siteSettings.status === 'closed' ? 0.5 : 1 }}
                            >
                                {isCheckingOut ? "Processing..." : "Checkout"}
                            </button>
                            <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Cart;