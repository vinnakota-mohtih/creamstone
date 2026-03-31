import React from "react";
import './Filter.css'
import { useState } from "react";
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
            description: <p>Ice cream served in a crispy, edible cone. Easy to hold and perfect for on - the - go eating. Comes in waffle, sugar, and cake cone varieties.</p>
        },
        {
            id: 2,
            title: 'straberry cone',
            category: 'cone',
            image: straberry,
            description: <p>Ice cream served in a cup instead of a cone. Less messy and easy to scoop with a spoon. Great for adding toppings and mixing flavors.</p>
        },
        {
            id: 3,
            title: 'chocolate cone',
            category: 'cone',
            image: chocolate,
            description: <p>Ice cream frozen on a stick for easy handling. Usually coated with chocolate or crunchy layers. Popular as a quick and convenient snack.</p>
        },
        {
            id: 4,
            title: 'mango cone',
            category: 'cone',
            image: mango,
            description: <p>A rich dessert with ice cream topped with syrups and nuts. Often includes whipped cream and a cherry on top. Perfect for indulgent and customized treats.</p>
        },
        {
            id: 5,
            title: 'all mix cone',
            category: 'cone',
            image: allmix,
            description: <p>Ice cream placed between cookies or wafers. Soft outside with a creamy filling inside. Loved for its unique combination of textures.</p>
        },

        {
            id: 6,
            title: 'Oreo ice cream',
            category: 'cone',
            image: oreoice,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        },
        {
            id: 7,
            title: 'pista cup',
            category: 'cup',
            image: pista,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        },
        {
            id: 8,
            title: 'cookies and cream cup',
            category: 'cup',
            image: cookies,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        },
        {
            id: 9,
            title: 'mint chocolate cup',
            category: 'cup',
            image: mintchocolate,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        },
        {
            id: 10,
            title: 'strawberry cup',
            category: 'cup',
            image: strawberrycup,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        },
        {
            id: 11,
            title: 'mango bar',
            category: 'bar',
            image: mangobar,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        },
        {
            id: 12,
            title: 'chocolate bar',
            category: 'bar',
            image: chocolatebar,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
        },
        {
            id: 13,
            title: 'strawberry bar',
            category: 'bar',
            image: strawberrybar,
            description: <p>A delicious chocolate waffle cone double scoop! Perfect for hot summer days.</p>
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
                    <input type="checkbox" onChange={() => setFilter('cone')} checked={filter === 'cone'} />Ice cream cone
                </label>
                <label>
                    <input type="checkbox" onChange={() => setFilter('cup')} checked={filter === 'cup'} />Ice cream cup
                </label>
                <label>
                    <input type="checkbox" onChange={() => setFilter('bar')} checked={filter === 'bar'} />Ice cream bar
                </label>
                <label>
                    <input type="checkbox" onChange={() => setFilter('sundae')} checked={filter === 'sundae'} />Ice cream sundae
                </label>
                <label>
                    <input type="checkbox" onChange={() => setFilter('sandwich')} checked={filter === 'sandwich'} />Ice cream sandwich
                </label>
            </div>

            <div className="slides">
                {filteredSlides.map(slide => (
                    <div key={slide.id} className="slide">
                        <img src={slide.image} alt={slide.title} />
                        <h3>{slide.title}</h3>
                        <p><strong> catagory: </strong>{slide.category}</p>
                        {slide.description}
                        <button className='btn'>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filter