import React from 'react'
import './Scroll.css'
import useProducts from '../hooks/useProducts'

const Scroll = () => {
    const { products, loading } = useProducts();
    const bestSellers = products.filter(p => p.bestSeller);
    
    if (loading) return null;

    const displayItems = bestSellers.length > 0 ? bestSellers : [];

    return (
        <>
            <div className='scroll'>
                <div className="scroll-container">
                    <div className="scroll-track">
                        {[...displayItems, ...displayItems].map((item, i) => (
                            <div className="card1" key={i}>
                                <img className='card1' src={item.image} alt={item.title} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Scroll