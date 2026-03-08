import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Mostras from './pages/Mostras';
import BrasilCriativo from './pages/BrasilCriativo';
import DnaOdara from './pages/DnaOdara';
import CartDrawer from './components/CartDrawer';
import { useState } from 'react';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="app">
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/:id" element={<ProductDetails />} />
          <Route path="/mostras" element={<Mostras />} />
          <Route path="/brasil-criativo" element={<BrasilCriativo />} />
          <Route path="/dna-odara" element={<DnaOdara />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;
