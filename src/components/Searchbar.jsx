import React from 'react'
import './Searchbar.css'
import { useCart } from '../context/CartContext'

function Searchbar() {
    const { searchQuery, setSearchQuery } = useCart();

    return (
        <div className="searchbar">
            <input 
                type="text" 
                placeholder="Search flavors... 🔎" 
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
                <button 
                    className='clear-search' 
                    onClick={() => setSearchQuery('')}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0 10px',
                        fontSize: '20px',
                        color: 'var(--text-color)'
                    }}
                >
                    ×
                </button>
            )}
        </div>
    )
}

export default Searchbar