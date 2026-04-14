import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, updateDoc, doc, deleteDoc, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import './Admin.css';

const Admin = () => {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [messages, setMessages] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [siteSettings, setSiteSettings] = useState(() => {
        const local = localStorage.getItem('siteSettings');
        return local ? JSON.parse(local) : { status: 'open', promo: '', deliveryFee: 40 };
    });

    // Form state
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: '',
        category: 'chocolate',
        price: '',
        image: '',
        description: '',
        stock: 50
    });

    const saveSettings = async () => {
        localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
        try {
            await setDoc(doc(db, 'settings', 'global'), siteSettings);
            alert("Site settings updated successfully!");
        } catch (err) {
            console.error("Error saving to Firebase, saved locally instead");
            alert("Settings saved locally!");
        }
    };

    const saveProduct = async () => {
        if (!newProduct.title || !newProduct.price) {
            alert("Please provide at least a title and price.");
            return;
        }

        try {
            await addDoc(collection(db, 'products'), {
                ...newProduct,
                price: Number(newProduct.price),
                createdAt: new Date().toISOString(),
                bestSeller: false
            });
            alert("Product added successfully!");
            setShowAddForm(false);
            setNewProduct({
                title: '',
                category: 'chocolate',
                price: '',
                image: '',
                description: '',
                stock: 50
            });
        } catch (err) {
            console.error(err);
            alert("Error adding product: " + err.message);
        }
    };

    useEffect(() => {
        // Simple listeners without orderBy to avoid index requirements
        const unsubOrders = onSnapshot(collection(db, 'orders'), (snap) => {
            const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            list.sort((a, b) => {
                const aTime = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
                const bTime = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
                return bTime - aTime;
            });
            setOrders(list);
        }, (err) => {
            console.error("Orders listener error:", err);
        });

        const unsubMessages = onSnapshot(collection(db, 'messages'), (snap) => {
            const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            list.sort((a, b) => {
                const aTime = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
                const bTime = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
                return bTime - aTime;
            });
            setMessages(list);
        }, (err) => {
            console.error("Messages listener error:", err);
        });

        const unsubProducts = onSnapshot(collection(db, 'products'), (snap) => {
            const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
            setProducts(list);
            setLoading(false);
        }, (err) => {
            console.error("Products listener error:", err);
            setLoading(false);
        });

        return () => {
            unsubOrders();
            unsubMessages();
            unsubProducts();
        };
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
        } catch (err) {
            console.error(err);
        }
    };

    const deleteProduct = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteDoc(doc(db, 'products', productId));
        }
    };

    if (loading) return <div className="loading" style={{ padding: '120px 40px', textAlign: 'center', fontSize: '1.2rem' }}>Loading Admin Dashboard...</div>;

    return (
        <div className="admin-page">
            <div className="admin-container">
                <header className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <div className="admin-tabs">
                        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders ({orders.length})</button>
                        <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products ({products.length})</button>
                        <button className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>Messages ({messages.length})</button>
                        <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Site Settings</button>
                    </div>
                </header>

                <div className="admin-content">
                    {activeTab === 'settings' && (
                        <div className="admin-panel">
                            <h2>Global Site Settings</h2>
                            
                            <div className="settings-section" style={{ marginTop: '20px' }}>
                                <h3>Store Operational Status</h3>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>Control whether customers can browse or check out.</p>
                                <div className="status-toggle" style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                                        <input type="radio" value="open" checked={siteSettings.status === 'open'} onChange={() => setSiteSettings({...siteSettings, status: 'open'})} />
                                        🟢 Open - Accepting Orders
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                                        <input type="radio" value="closed" checked={siteSettings.status === 'closed'} onChange={() => setSiteSettings({...siteSettings, status: 'closed'})} />
                                        🔴 Closed - Stop Orders
                                    </label>
                                </div>
                            </div>

                            <div className="settings-section" style={{ marginTop: '30px' }}>
                                <h3>Promotional Notice Banner</h3>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>This text will scroll at the very top of the website. Leave blank to disable.</p>
                                <input 
                                    type="text" 
                                    placeholder="e.g. 🔥 Get 20% OFF all Chocolate Shakes today!" 
                                    value={siteSettings.promo}
                                    onChange={(e) => setSiteSettings({...siteSettings, promo: e.target.value})}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div className="settings-section" style={{ marginTop: '30px' }}>
                                <h3>Base Delivery Fee (₹)</h3>
                                <input 
                                    type="number" 
                                    placeholder="e.g. 40" 
                                    value={siteSettings.deliveryFee}
                                    onChange={(e) => setSiteSettings({...siteSettings, deliveryFee: Number(e.target.value)})}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', maxWidth: '200px' }}
                                />
                            </div>
                            
                            <button className="save-btn" onClick={saveSettings} style={{ marginTop: '30px' }}>Save Settings</button>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="admin-panel">
                            <h2>Recent Orders</h2>
                            {orders.length === 0 ? (
                                <p style={{ padding: '20px', color: '#888' }}>No orders yet.</p>
                            ) : (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>OrderID</th>
                                            <th>Customer</th>
                                            <th>Items</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id}>
                                                <td>#{order.id.slice(0, 5)}</td>
                                                <td>{order.userName || 'Guest'}</td>
                                                <td>{order.items?.length || 0}</td>
                                                <td>₹{order.total}</td>
                                                <td><span className={`status-badge ${(order.status || 'pending').toLowerCase()}`}>{order.status || 'Pending'}</span></td>
                                                <td>
                                                    <select value={order.status || 'Pending'} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="admin-panel">
                            <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h2>Manage Inventory</h2>
                                <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
                                    {showAddForm ? 'Cancel' : 'Add New Product'}
                                </button>
                            </div>

                            {showAddForm && (
                                <motion.div
                                    className="add-product-form"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                >
                                    <h3>Create New Product</h3>
                                    <div className="form-grid">
                                        <input
                                            type="text"
                                            placeholder="Product Title"
                                            value={newProduct.title}
                                            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                                        />
                                        <select
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                        >
                                            <option value="chocolate">Chocolate</option>
                                            <option value="fruit">Fruit</option>
                                            <option value="nutty">Nutty & Caramel</option>
                                            <option value="specials">Signature</option>
                                            <option value="shake">Thick Shake</option>
                                        </select>
                                        <input
                                            type="number"
                                            placeholder="Price (₹)"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Image URL"
                                            value={newProduct.image}
                                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                        />
                                        <textarea
                                            placeholder="Product Description"
                                            value={newProduct.description}
                                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button className="save-btn" onClick={saveProduct}>Save Product</button>
                                </motion.div>
                            )}

                            <div className="product-grid-admin">
                                {products.map(p => (
                                    <div key={p.id} className="product-item-admin">
                                        <img src={p.image} alt={p.title} />
                                        <div className="p-info">
                                            <h4>{p.title}</h4>
                                            <p>₹{p.price}</p>
                                        </div>
                                        <div className="p-actions">
                                            <button className="del-btn" onClick={() => deleteProduct(p.id)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <div className="admin-panel">
                            <h2>Customer Enquiries</h2>
                            {messages.length === 0 ? (
                                <p style={{ padding: '20px', color: '#888' }}>No messages yet.</p>
                            ) : (
                                <div className="messages-list">
                                    {messages.map(m => (
                                        <div key={m.id} className="message-card">
                                            <div className="m-header">
                                                <strong>{m.name}</strong>
                                                <span>{m.email}</span>
                                            </div>
                                            <p>{m.message}</p>
                                            <span className="m-date">{m.createdAt?.toDate?.()?.toLocaleString?.() || 'Unknown date'}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
