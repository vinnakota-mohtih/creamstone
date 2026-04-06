import React from "react";
import './Product.css'
import Filter from "../components/Filter.jsx";
import hero from "../assets/hero.jpg";
const Product = () => {
    return (
        <div className="product-page-container">
            <div className="hero-container1">
                <img className="hero1" src={hero} alt="" />
            </div>
            <Filter />
        </div>
    )
}

export default Product