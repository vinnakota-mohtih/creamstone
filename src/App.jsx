import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Orders from './pages/Orders.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Admin from './pages/Admin.jsx'
import Login from './pages/Login.jsx'
import Sigin from './pages/Sigin.jsx'
import { useAuth } from './context/AuthContext'

function App() {
  const { currentUser, isAdmin } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        
        {/* Protected Routes */}
        <Route 
          path="/cart" 
          element={currentUser ? <Cart /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/wishlist" 
          element={currentUser ? <Wishlist /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/orders" 
          element={currentUser ? <Orders /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin" 
          element={isAdmin ? <Admin /> : <Navigate to="/" />} 
        />
        
        <Route path="/login" element={<Login />} />
        <Route path='/Sigin' element={<Sigin />} />
      </Routes>
     
      <Footer />

    </>
  )
}

export default App
