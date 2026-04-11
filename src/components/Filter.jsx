import React from "react";
import './Filter.css'
import { useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard.jsx";
import rainbow from "../assets/rainbow.jpg"
import oreoice from "../assets/oreoice.jpg"
import dbc from "../assets/death-by-chocolate.jpg"
import dbc2 from "../assets/products/death_by_chocolate.png"
import nuts from "../assets/products/nuts_overload.png"
import mango_p from "../assets/products/alphonso_mango.png"
import biscoff from "../assets/products/lotus_biscoff.png"
import shake_img from "../assets/products/chocolate_shake.png"
import karamel from "../assets/products/karamel_sutra.png"
import fruit_affair from "../assets/products/fruity_affair.png"
import pista from "../assets/cups/pistacup.png"
import cookies from "../assets/cups/cookiescreamcup.png"
import strawberrycup from "../assets/cups/strawberrycup.png"
import chocolatebar from "../assets/bars/chocolate.png"
import Belgian from "../assets/Belgian.png"
import Ferrero from "../assets/Ferrero.jpg"
const Filter = () => {
    const { addToCart } = useCart();

    // A single, flat list of all your items.
    // If you want "more items in one group", just add another object here 
    // and give it the same `category` (like 'cone', 'cup', etc.)
    const allSlides = [
        // --- CHOCOLATE CONCEPTS ---
        {
            id: 1,
            title: 'Death by Chocolate',
            category: 'chocolate',
            image: dbc,
            price: 195,
            bestSeller: true,
            description: "Double scoops of dark chocolate ice cream mixed with brownies, chocolate chips, and hot chocolate fudge."
        },
        {
            id: 2,
            title: 'Swiss Choco Bites',
            category: 'chocolate',
            image: chocolatebar,
            price: 180,
            description: "Signature chocolate ice cream blended with bite-sized Swiss chocolate chunks and dark fudge."
        },
        {
            id: 3,
            title: 'Belgian Brownie Fudge',
            category: 'chocolate',
            image: Belgian,
            price: 185,
            bestSeller: true,
            description: "Indulgent Belgian chocolate ice cream mixed with moist brownies and gooey chocolate fudge."
        },
        {
            id: 4,
            title: 'Ferrero Love',
            category: 'chocolate',
            image: Ferrero,
            price: 220,
            bestSeller: true,
            description: "Hazlenut chocolate ice cream blended with Ferrero Rocher pieces, nuts, and Nutella."
        },
        {
            id: 5,
            title: 'Choco Lava',
            category: 'chocolate',
            image: dbc2,
            price: 190,
            description: "Chocolate ice cream base mixed with Oreo bits and topped with a warm chocolate lava cake."
        },

        // --- NUTTY & CARAMEL ---
        {
            id: 10,
            title: 'Nuts Overload',
            category: 'nutty',
            image: nuts,
            price: 185,
            bestSeller: true,
            description: "Caramel and Butterscotch ice cream loaded with roasted almonds, cashews, and pecans."
        },
        {
            id: 11,
            title: 'Karamel Sutra',
            category: 'nutty',
            image: karamel,
            price: 175,
            description: "Exquisite caramel ice cream base mixed with golden pralines, nuts, and liquid caramel."
        },
        {
            id: 12,
            title: 'Almond Rocks',
            category: 'nutty',
            image: nuts,
            price: 170,
            description: "Roasted almond chunks blended with a creamy chocolate base and a hint of salt."
        },
        {
            id: 13,
            title: 'Cashew Crunch',
            category: 'nutty',
            image: nuts,
            price: 165,
            description: "Salted cashews and praline mixed with smooth vanilla and butterscotch ice cream."
        },

        // --- FRUIT CONCEPTS ---
        {
            id: 20,
            title: 'Alphonso Mango',
            category: 'fruit',
            image: mango_p,
            price: 160,
            bestSeller: true,
            description: "Natural Alphonso mango pulp blended with creamy milk and fresh mango chunks."
        },
        {
            id: 21,
            title: 'Fruity Affair',
            category: 'fruit',
            image: fruit_affair,
            price: 170,
            description: "A refreshing blend of fresh apple, pineapple, and grapes with a creamy fruit base."
        },
        {
            id: 22,
            title: 'Strawberry Passion',
            category: 'fruit',
            image: strawberrycup,
            price: 155,
            description: "Fresh strawberry extract mixed with real fruit chunks for a sweet, tangy experience."
        },
        {
            id: 23,
            title: 'Oh Mango Jamun',
            category: 'fruit',
            image: mango_p,
            price: 185,
            description: "A signature Indian fusion: Alphonso mango ice cream mixed with hot Gulab Jamun."
        },
        {
            id: 24,
            title: 'Black Currant',
            category: 'fruit',
            image: fruit_affair,
            price: 150,
            description: "Ice cream mixed with real black currant berries for a bold fruit flavor."
        },

        // --- INTERNATIONAL SPECIALS ---
        {
            id: 30,
            title: 'Lotus Biscoff',
            category: 'specials',
            image: biscoff,
            price: 210,
            bestSeller: true,
            description: "The world-famous caramelized biscuit blended with velvet vanilla and Biscoff spread."
        },
        {
            id: 31,
            title: 'Red Velvet Surprise',
            category: 'specials',
            image: rainbow,
            price: 195,
            description: "Cream cheese flavored ice cream mixed with actual Red Velvet cake sponge and crumbs."
        },
        {
            id: 32,
            title: 'Cookies & Cream',
            category: 'specials',
            image: cookies,
            price: 175,
            description: "The classic duo: Creamy vanilla ice cream mixed with heaps of crushed dark chocolate cookies."
        },

        // --- SHAKES ---
        {
            id: 40,
            title: 'Nutella Brownie Shake',
            category: 'shake',
            image: shake_img,
            price: 165,
            description: "A thick, decadent shake blended with a whole brownie and plenty of Nutella."
        },
        {
            id: 41,
            title: 'Oreo Thick Shake',
            category: 'shake',
            image: shake_img,
            price: 150,
            description: "A silky smooth shake made with crushed Oreos and a dense chocolate base."
        },
        {
            id: 42,
            title: 'Belgian Dark Shake',
            category: 'shake',
            image: shake_img,
            price: 170,
            description: "For the true dark chocolate lover: Extra rich Belgian chocolate blended to perfection."
        },

        // --- CLASSICS ---
        
        {
            id: 51,
            title: 'Double Chocolate',
            category: 'classics',
            image: dbc,
            price: 110,
            description: "Two scoops of rich chocolate for those who love the simple classics."
        },
        {
            id: 52,
            title: 'Roasted Pista',
            category: 'classics',
            image: pista,
            price: 120,
            description: "Traditional Pistachio flavored ice cream with roasted nut pieces."
        }
    ];

    const [filter, setFilter] = useState("All");

    // This filters the flat array based on the category!
    const filteredSlides = filter === 'All'
        ? allSlides
        : allSlides.filter(slide => slide.category === filter);

    return (
        <div className="filter">
            <div className="filter-buttons">
                <label>
                    <input type="checkbox" onChange={() => setFilter('All')} checked={filter === 'All'} /> All
                </label>
                <label>
                    <input type="checkbox" onChange={() => setFilter('chocolate')} checked={filter === 'chocolate'} /> Chocolate Concepts
                </label>
                <label>
                    <input type="checkbox" onChange={() => setFilter('fruit')} checked={filter === 'fruit'} /> Fruit Concepts
                </label>
                <label>
                    <input type="checkbox" onChange={() => setFilter('nutty')} checked={filter === 'nutty'} /> Nutty & Caramel
                </label>
                <label>
                    <input type="checkbox" onChange={() => setFilter('specials')} checked={filter === 'specials'} /> Signature
                </label>
                <label>
                    <input type="checkbox" onChange={() => setFilter('shake')} checked={filter === 'shake'} /> Thick Shakes
                </label>
                <label>
                    <input type="checkbox" onChange={() => setFilter('classics')} checked={filter === 'classics'} /> Classics
                </label>
            </div>

            <div className="slides">
                {filteredSlides.map((slide, index) => (
                    <ProductCard key={slide.id} product={slide} index={index} />
                ))}
            </div>
        </div>
    )
}

export default Filter