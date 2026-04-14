import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import './Orders.css';

const Orders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Simple listener, filter client-side to avoid composite index requirement
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const allOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Filter for this user and sort by date
      const userOrders = allOrders
        .filter(o => o.userId === currentUser.uid)
        .sort((a, b) => {
          const aTime = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
          const bTime = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
          return bTime - aTime;
        });
      setOrders(userOrders);
      setLoading(false);
    }, (err) => {
      console.error("Orders error:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) return <div className="loading" style={{ padding: '120px 40px', textAlign: 'center' }}>Loading your orders...</div>;

  return (
    <motion.div 
      className="orders-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="orders-container">
        <h1>My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="no-orders" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <span className="label">Order ID:</span>
                    <span className="value">#{order.id.slice(0, 8)}</span>
                  </div>
                  <div>
                    <span className="label">Date:</span>
                    <span className="value">
                      {order.createdAt?.toDate?.()?.toLocaleDateString?.() || 'Processing...'}
                    </span>
                  </div>
                  <div className={`status ${(order.status || 'pending').toLowerCase()}`}>
                    {order.status || 'Pending'}
                  </div>
                </div>
                
                <div className="order-items">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <img src={item.image} alt={item.title} />
                      <div className="item-info">
                        <p className="item-title">{item.title}</p>
                        <p className="item-qty">Qty: {item.quantity}</p>
                      </div>
                      <p className="item-price">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                
                <div className="order-footer">
                  <div className="total">
                    <span className="label">Total Amount:</span>
                    <span className="value price">₹{order.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Orders;
