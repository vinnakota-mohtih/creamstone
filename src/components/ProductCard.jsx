import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, index }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(
    wishlist.some(item => item.id === product.id)
  );

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    setIsWishlisted(!isWishlisted);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 12,
        delay: index * 0.1
      }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      className="product-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <div className="product-card-image" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <img src={product.image} alt={product.title} />
        <div className="product-overlay" onClick={(e) => e.stopPropagation()}>
          <motion.button 
            className="overlay-btn" 
            aria-label="Add to Wishlist"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
          >
            {isWishlisted ? <FaHeart style={{ color: 'red' }} /> : <FiHeart />}
          </motion.button>
          <motion.button 
            className="overlay-btn" 
            aria-label="Add to Cart"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
          >
            <FiShoppingCart />
          </motion.button>
        </div>
        {product.bestSeller && <span className="best-seller-tag">Best Seller</span>}
      </div>
      <div className="product-card-info" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <p className="category">{product.category}</p>
        <h3>{product.title}</h3>
        <p className="description">{product.description}</p>
        <div className="product-card-footer">
          <span className="price">₹{product.price}</span>
        </div>
        
      </div>
    </motion.div>
  );
};

export default ProductCard;
