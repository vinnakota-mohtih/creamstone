import { useState, useEffect } from 'react';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { staticProducts } from '../data/staticProducts';

const useProducts = () => {
  const [products, setProducts] = useState(staticProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if Firebase is enabled, otherwise use static data
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const unsubscribe = onSnapshot(productsRef, (snapshot) => {
          try {
            const productsList = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            
            // If the database is empty (or seeding), fall back to static data so the page always looks full!
            if (productsList.length < 5) {
                console.log("Database has very few products. Hydrating with static catalog for presentation.");
                // Merge static items that don't exist yet
                const merged = [...productsList, ...staticProducts.filter(sp => !productsList.some(p => p.title === sp.title))];
                merged.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
                setProducts(merged);
            } else {
                productsList.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
                setProducts(productsList);
            }
            setLoading(false);
          } catch (err) {
            console.error("Error processing snapshot:", err);
            setProducts(staticProducts);
            setLoading(false);
          }
        }, (err) => {
          console.error("Firebase connection error (API might be disabled or offline):", err);
          console.log("Falling back to local high-res catalog...");
          setProducts(staticProducts);
          setLoading(false);
        });

        return unsubscribe;
      } catch (e) {
          console.log("Falling back to static products...");
          setProducts(staticProducts);
          setLoading(false);
          return () => {};
      }
    };
    
    const unsubscribeFn = fetchProducts();
    // In React 18 strict mode, useEffect cleanup expects a function or undefined
    return () => {
        unsubscribeFn.then(unsub => {
            if (typeof unsub === 'function') unsub();
        });
    };
  }, []);

  return { products, loading, error };
};

export default useProducts;

