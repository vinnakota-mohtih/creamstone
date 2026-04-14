import React, { useState } from "react";
import './Filter.css'
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard.jsx";
import useProducts from "../hooks/useProducts";

const Filter = () => {
    const { products, loading, error } = useProducts();
    const [filter, setFilter] = useState("All");

    if (loading) return <div className="loading" style={{ padding: '40px', textAlign: 'center', fontSize: '1.2rem' }}>Loading treats...</div>;
    if (error) return <div className="error">{error}</div>;

    // Filter the products based on the category
    const filteredSlides = filter === 'All'
        ? products
        : products.filter(slide => slide.category?.toLowerCase() === filter.toLowerCase());

    return (
        <div className="filter">
            <div className="filter-buttons">
                <button 
                    className={`filter-btn ${filter === 'All' ? 'active' : ''}`} 
                    onClick={() => setFilter('All')}
                >
                    All Treat Collections
                </button>
                <button 
                    className={`filter-btn ${filter === 'chocolate' ? 'active' : ''}`} 
                    onClick={() => setFilter('chocolate')}
                >
                    Chocolate Concepts
                </button>
                <button 
                    className={`filter-btn ${filter === 'fruit' ? 'active' : ''}`} 
                    onClick={() => setFilter('fruit')}
                >
                    Fruit Concepts
                </button>
                <button 
                    className={`filter-btn ${filter === 'nutty' ? 'active' : ''}`} 
                    onClick={() => setFilter('nutty')}
                >
                    Nutty & Caramel
                </button>
                <button 
                    className={`filter-btn ${filter === 'specials' ? 'active' : ''}`} 
                    onClick={() => setFilter('specials')}
                >
                    Signature & Specials
                </button>
                <button 
                    className={`filter-btn ${filter === 'shake' ? 'active' : ''}`} 
                    onClick={() => setFilter('shake')}
                >
                    Thick Shakes
                </button>
            </div>

            <div className="slides">
                {filteredSlides.map((slide, index) => (
                    <ProductCard key={slide.id} product={slide} index={index} />
                ))}
            </div>
            {filteredSlides.length === 0 && (
                <div className="no-products" style={{ padding: '60px', textAlign: 'center' }}>
                    <p>No products found in this category.</p>
                </div>
            )}
        </div>
    )
}

export default Filter