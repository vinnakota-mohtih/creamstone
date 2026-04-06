import React, { useState } from "react";
import './Filter.css'
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { AnimatePresence, motion } from 'framer-motion'
import rainbow from "../assets/rainbow.jpg"
import oreoice from "../assets/oreoice.jpg"
import straberry from "../assets/cones/straberry.png"
import chocolate from "../assets/cones/chocolatecone.png"
import mango from "../assets/cones/mango.png"
import allmix from "../assets/cones/allmix.png"
import pista from "../assets/cups/pistacup.png"
import cookies from "../assets/cups/cookiescreamcup.png"
import mintchocolate from "../assets/cups/mintchocolate.png"
import strawberrycup from "../assets/cups/strawberrycup.png"
import mangobar from "../assets/bars/mango.png"
import chocolatebar from "../assets/bars/chocolate.png"
import strawberrybar from "../assets/bars/strwberry.png"
import { Link } from "react-router-dom";



const Filter = () => {
    // A single, flat list of all your items.
    // If you want "more items in one group", just add another object here 
    // and give it the same `category` (like 'cone', 'cup', etc.)
    const allSlides = [
        {
            id: 1,
            title: 'Rainbow cone',
            category: 'cone',
            image: rainbow,
            price: 150,
            description: <p>Ice cream served in a crispy, edible cone. Easy to hold and perfect for on - the - go eating. Comes in waffle, sugar, and cake cone varieties.</p>
        },
        {
            id: 2,
            title: 'straberry cone',
            category: 'cone',
            image: straberry,
            price: 180,
            description: <p>Ice cream served in a cup instead of a cone. Less messy and easy to scoop with a spoon. Great for adding toppings and mixing flavors.</p>
        },
        {
            id: 3,
            title: 'chocolate cone',
            category: 'cone',
            image: chocolate,
            price: 160,
            description: <p>Ice cream frozen on a stick for easy handling. Usually coated with chocolate or crunchy layers. Popular as a quick and convenient snack.</p>
        },

        {
            id: 4,
            title: 'pista cup',
            category: 'cup',
            image: pista,
            price: 120,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        },
        {
            id: 5,
            title: 'cookies and cream cup',
            category: 'cup',
            image: cookies,
            price: 130,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        },
        {
            id: 6,
            title: 'mint chocolate cup',
            category: 'cup',
            image: mintchocolate,
            price: 130,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        },

        {
            id: 8,
            title: 'mango bar',
            category: 'bar',
            image: mangobar,
            price: 60,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        },
        {
            id: 9,
            title: 'chocolate bar',
            category: 'bar',
            image: chocolatebar,
            price: 70,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        },
        {
            id: 10,
            title: 'strawberry bar',
            category: 'bar',
            image: strawberrybar,
            price: 80,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        }
    ];

    const navigate = useNavigate();
    const { addToCart, toggleWishlist, wishlist, searchQuery } = useCart();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        },
    };
    const item = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 2,
            transition: { duration: 0.5 }
        }
    };


    const [filter, setFilter] = useState("All");

    // This filters the flat array based on the category AND search query!
    const filteredSlides = allSlides.filter(slide => {
        const matchesCategory = filter === 'All' || slide.category === filter;
        const matchesSearch = !searchQuery ||
            slide.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <motion.div initial="hidden" animate="visible" variants={container} className="filter">
            <div className="filter-buttons">
                <label>
                    <motion.input type="checkbox" onChange={() => setFilter('All')} checked={filter === 'All'} /> All
                </label>
                <label>
                    <motion.input type="checkbox" onChange={() => setFilter('cone')} checked={filter === 'cone'} />Ice cream cone
                </label>
                <label>
                    <motion.input type="checkbox" onChange={() => setFilter('cup')} checked={filter === 'cup'} />Ice cream cup
                </label>
                <label>
                    <motion.input type="checkbox" onChange={() => setFilter('bar')} checked={filter === 'bar'} />Ice cream bar
                </label>
                <label>
                    <motion.input type="checkbox" onChange={() => setFilter('sundae')} checked={filter === 'sundae'} />Ice cream sundae
                </label>
                <label>
                    <motion.input type="checkbox" onChange={() => setFilter('sandwich')} checked={filter === 'sandwich'} />Ice cream sandwich
                </label>
            </div>

            <div className="slides">
                {filteredSlides.map(slide => (
                    <motion.div
                        variants={item}
                        key={slide.id}
                        className="slide"
                        onClick={() => setSelectedProduct(slide)}
                    >
                        <img src={slide.image} alt={slide.title} />
                        <h3>{slide.title}</h3>
                        <p className="price">₹{slide.price}</p>
                        <p><strong> category: </strong>{slide.category}</p>
                        <Link to="/cart">
                            <button
                                className='btn'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(slide);
                                }}
                            >
                                Add to Cart
                            </button>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>
                            <img src={selectedProduct.image} alt={selectedProduct.title} />
                            <h2>{selectedProduct.title}</h2>
                            <p className="price">₹{selectedProduct.price}</p>
                            <p>{selectedProduct.description}</p>
                            <div className="modal-actions">
                                <Link to="/cart">
                                    <button className="btn" onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
                                </Link>
                                <Link to="/Wishlist">
                                    <button
                                        className="btn"
                                        onClick={() => toggleWishlist(selectedProduct)}
                                    >
                                        {wishlist.find(item => item.id === selectedProduct.id) ? "Remove Wishlist" : "Add to Wishlist"}
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Filter