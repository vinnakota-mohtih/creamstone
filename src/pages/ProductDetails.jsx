import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar, FiArrowLeft } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { addToCart, toggleWishlist, wishlist } = useCart();
    
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isWishlisted = wishlist.some(item => item.id === id);

    useEffect(() => {
        const fetchProduct = async () => {
            const docRef = doc(db, 'products', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProduct({ id: docSnap.id, ...docSnap.data() });
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (!id) return;
        const q = query(
            collection(db, 'reviews'),
            where('productId', '==', id),
            orderBy('createdAt', 'desc')
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, [id]);

    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert("Please login to leave a review");
            return;
        }
        if (!newReview.comment.trim()) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'reviews'), {
                productId: id,
                userId: currentUser.uid,
                userName: currentUser.displayName || 'Anonymous',
                rating: newReview.rating,
                comment: newReview.comment,
                createdAt: serverTimestamp()
            });
            setNewReview({ rating: 5, comment: '' });
        } catch (err) {
            console.error("Review error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="loading">Loading details...</div>;
    if (!product) return <div className="error">Product not found.</div>;

    const averageRating = reviews.length 
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    return (
        <motion.div 
            className="product-details-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="details-container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <FiArrowLeft /> Back
                </button>

                <div className="product-main">
                    <div className="image-section">
                        <img src={product.image} alt={product.title} />
                    </div>
                    
                    <div className="info-section">
                        <p className="category-tag">{product.category}</p>
                        <h1>{product.title}</h1>
                        
                        <div className="rating-summary">
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <FaStar key={s} color={s <= (averageRating || 0) ? "#FFD700" : "#ddd"} />
                                ))}
                            </div>
                            <span>{averageRating ? `${averageRating} / 5` : 'No reviews yet'}</span>
                            <span className="review-count">({reviews.length} reviews)</span>
                        </div>

                        <p className="price-tag">₹{product.price}</p>
                        <p className="full-description">{product.description}</p>
                        
                        <div className="actions">
                            <motion.button 
                                className="add-to-cart-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => addToCart(product)}
                            >
                                <FiShoppingCart /> Add to Cart
                            </motion.button>
                            <motion.button 
                                className={`wishlist-detail-btn ${isWishlisted ? 'active' : ''}`}
                                onClick={() => toggleWishlist(product)}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FiHeart />
                            </motion.button>
                        </div>
                    </div>
                </div>

                <div className="reviews-section">
                    <h2>Customer Reviews</h2>
                    
                    {currentUser ? (
                        <form className="review-form" onSubmit={handleAddReview}>
                            <h3>Add a Review</h3>
                            <div className="rating-input">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <button 
                                        type="button" 
                                        key={s} 
                                        onClick={() => setNewReview({...newReview, rating: s})}
                                    >
                                        <FaStar color={s <= newReview.rating ? "#FFD700" : "#ddd"} />
                                    </button>
                                ))}
                            </div>
                            <textarea 
                                placeholder="Share your experience..."
                                value={newReview.comment}
                                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                required
                            />
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Posting...' : 'Post Review'}
                            </button>
                        </form>
                    ) : (
                        <p className="login-prompt">Please login to write a review.</p>
                    )}

                    <div className="reviews-list">
                        {reviews.map(review => (
                            <div key={review.id} className="review-item">
                                <div className="review-header">
                                    <strong>{review.userName}</strong>
                                    <div className="review-stars">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <FaStar key={s} size={12} color={s <= review.rating ? "#FFD700" : "#ddd"} />
                                        ))}
                                    </div>
                                </div>
                                <p>{review.comment}</p>
                                <span className="date">{review.createdAt?.toDate().toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetails;
