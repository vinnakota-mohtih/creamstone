import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('creamstone-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('creamstone-wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('creamstone-cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('creamstone-wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = (message) => {
        setToast(message);
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            showToast(`Added ${product.title} to cart!`);
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const toggleWishlist = (product) => {
        setWishlist((prevWishlist) => {
            const isWishlisted = prevWishlist.find((item) => item.id === product.id);
            if (isWishlisted) {
                return prevWishlist.filter((item) => item.id !== product.id);
            }
            return [...prevWishlist, product];
        });
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            wishlist, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            toggleWishlist,
            cartCount,
            cartTotal,
            searchQuery,
            setSearchQuery,
            toast
        }}>
            {children}
            {toast && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    zIndex: 2000,
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    {toast}
                </div>
            )}
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </CartContext.Provider>
    );
};
