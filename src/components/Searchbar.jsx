import React from 'react'
import './Searchbar.css'
import { useCart } from '../context/CartContext'

function Searchbar() {
    const { searchQuery, setSearchQuery } = useCart();

    return (
        <>
            <div className="searchbar">
                <input 
                    type="text" 
                    placeholder="Search 🔎" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </>
    )
}

export default Searchbar