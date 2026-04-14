import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, limit } from 'firebase/firestore';

const productsToSeed = [
    {
        title: 'Death by Chocolate',
        category: 'chocolate',
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800",
        price: 195,
        bestSeller: true,
        description: "Double scoops of dark chocolate ice cream mixed with brownies, chocolate chips, and hot chocolate fudge.",
        stock: 50
    },
    {
        title: 'Swiss Choco Bites',
        category: 'chocolate',
        image: "https://images.unsplash.com/photo-1515037028865-0a2a82603f7c?auto=format&fit=crop&q=80&w=800",
        price: 180,
        bestSeller: false,
        description: "Signature chocolate ice cream blended with bite-sized Swiss chocolate chunks and dark fudge.",
        stock: 40
    },
    {
        title: 'Belgian Brownie Fudge',
        category: 'chocolate',
        image: "https://images.unsplash.com/photo-1543208930-dc1e1c7482fd?auto=format&fit=crop&q=80&w=800",
        price: 185,
        bestSeller: true,
        description: "Indulgent Belgian chocolate ice cream mixed with moist brownies and gooey chocolate fudge.",
        stock: 35
    },
    {
        title: 'Ferrero Love',
        category: 'chocolate',
        image: "https://images.unsplash.com/photo-1582236528751-244f0ce5130b?auto=format&fit=crop&q=80&w=800",
        price: 220,
        bestSeller: true,
        description: "Hazlenut chocolate ice cream blended with Ferrero Rocher pieces, nuts, and Nutella.",
        stock: 25
    },
    {
        title: 'Nuts Overload',
        category: 'nutty',
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800",
        price: 185,
        bestSeller: true,
        description: "Caramel and Butterscotch ice cream loaded with roasted almonds, cashews, and pecans.",
        stock: 30
    },
    {
        title: 'Karamel Sutra',
        category: 'nutty',
        image: "https://images.unsplash.com/photo-1614948408836-8149e6939981?auto=format&fit=crop&q=80&w=800",
        price: 175,
        bestSeller: false,
        description: "Exquisite caramel ice cream base mixed with golden pralines, nuts, and liquid caramel.",
        stock: 30
    },
    {
        title: 'Alphonso Mango',
        category: 'fruit',
        image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=800",
        price: 160,
        bestSeller: true,
        description: "Natural Alphonso mango pulp blended with creamy milk and fresh mango chunks.",
        stock: 60
    },
    {
        title: 'Strawberry Passion',
        category: 'fruit',
        image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=800",
        price: 155,
        bestSeller: false,
        description: "Fresh strawberry extract mixed with real fruit chunks for a sweet, tangy experience.",
        stock: 50
    },
    {
        title: 'Lotus Biscoff',
        category: 'specials',
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800",
        price: 210,
        bestSeller: true,
        description: "The world-famous caramelized biscuit blended with velvet vanilla and Biscoff spread.",
        stock: 20
    },
    {
        title: 'Red Velvet Surprise',
        category: 'specials',
        image: "https://images.unsplash.com/photo-1586788680434-30d324634bf6?auto=format&fit=crop&q=80&w=800",
        price: 195,
        bestSeller: false,
        description: "Cream cheese flavored ice cream mixed with actual Red Velvet cake sponge and crumbs.",
        stock: 15
    },
    {
        title: 'Nutella Brownie Shake',
        category: 'shake',
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800",
        price: 165,
        bestSeller: false,
        description: "A thick, decadent shake blended with a whole brownie and plenty of Nutella.",
        stock: 40
    },
    {
        title: 'Oreo Thick Shake',
        category: 'shake',
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28be0?auto=format&fit=crop&q=80&w=800",
        price: 150,
        bestSeller: false,
        description: "A silky smooth shake made with crushed Oreos and a dense chocolate base.",
        stock: 45
    }
];

const ProductSeeder = () => {
    const [status, setStatus] = useState('Checking database...');
    const [done, setDone] = useState(false);

    useEffect(() => {
        const autoSeed = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'products'));

                if (snapshot.size > 5) {
                    setStatus(`✅ Database ready (${snapshot.size} products found)`);
                    setDone(true);
                    return;
                }

                if (snapshot.size > 0 && snapshot.size <= 5) {
                    setStatus(`⚠️ Only ${snapshot.size} products found. Click to add more!`);
                    setDone(false);
                    return;
                }

                await handleSeed();
            } catch (err) {
                console.error('Seed error:', err);
                setStatus('❌ Error: ' + err.message);
            }
        };
        autoSeed();
    }, []);

    const handleSeed = async () => {
        try {
            setStatus('⏳ Seeding products...');
            let count = 0;
            for (const product of productsToSeed) {
                // Check if product already exists by title to avoid duplicates
                const existingList = await getDocs(collection(db, 'products'));
                const alreadyExists = existingList.docs.some(d => d.data().title === product.title);
                
                if (!alreadyExists) {
                    await addDoc(collection(db, 'products'), {
                        ...product,
                        createdAt: new Date().toISOString()
                    });
                    count++;
                }
                setStatus(`⏳ Seeding... ${Math.round((count / productsToSeed.length) * 100)}%`);
            }
            setStatus(`✅ Success! Added ${count} new products.`);
            setDone(true);
        } catch (err) {
            setStatus('❌ Error: ' + err.message);
        }
    }

    return (
        <div style={{
            padding: '12px 20px',
            background: done ? 'rgba(40, 167, 69, 0.95)' : 'rgba(0, 217, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 9999,
            color: 'white',
            fontSize: '14px',
            fontWeight: 500,
            maxWidth: '350px',
            cursor: !done ? 'pointer' : 'default'
        }}
        onClick={!done ? handleSeed : undefined}
        >
            {status} {!done && ' (Click to Fix)'}
        </div>
    );
};

export default ProductSeeder;
