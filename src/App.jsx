import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Body from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import Contact from './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import About from './pages/About.jsx'
import Cart from './pages/Cart.jsx'
import Wishlist from './pages/Wishlist.jsx'


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
