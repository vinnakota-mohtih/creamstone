import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase/firebaseConfig';
import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('creamstone-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('creamstone-wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    const [isSyncing, setIsSyncing] = useState(false);

    // Initial load from Firestore when user logs in
    useEffect(() => {
        if (currentUser) {
            const fetchUserData = async () => {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    if (data.cart) setCart(data.cart);
                    if (data.wishlist) setWishlist(data.wishlist);
                }
            };
            fetchUserData();
        }
    }, [currentUser]);

    // Save to LocalStorage and Firestore
    useEffect(() => {
        localStorage.setItem('creamstone-cart', JSON.stringify(cart));
        if (currentUser && !isSyncing) {
            setDoc(doc(db, 'users', currentUser.uid), { cart }, { merge: true });
        }
    }, [cart, currentUser]);

    useEffect(() => {
        localStorage.setItem('creamstone-wishlist', JSON.stringify(wishlist));
        if (currentUser && !isSyncing) {
            setDoc(doc(db, 'users', currentUser.uid), { wishlist }, { merge: true });
        }
    }, [wishlist, currentUser]);

    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
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
            showToast(`Added to favorites!`);
            return [...prevWishlist, product];
        });
    };

    const checkout = async (shippingData) => {
        if (!currentUser) throw new Error("Must be logged in to checkout");
        if (cart.length === 0) throw new Error("Cart is empty");

        const orderData = {
            userId: currentUser.uid,
            userName: currentUser.displayName,
            items: cart,
            total: cartTotal,
            status: 'Pending',
            createdAt: serverTimestamp(),
            shipping: shippingData
        };

        const docRef = await addDoc(collection(db, 'orders'), orderData);
        clearCart();
        showToast("Order placed successfully!");
        return docRef.id;
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
            checkout,
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
