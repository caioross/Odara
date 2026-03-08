import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Mostras from './pages/Mostras';
import BrasilCriativo from './pages/BrasilCriativo';
import DnaOdara from './pages/DnaOdara';
import Account from './pages/Account';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import { useState, useEffect } from 'react';
import { supabase } from './services/supabase';
import { useUserStore } from './store/useUserStore';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { setUser, setSession, setIsLoading } = useUserStore();

  useEffect(() => {
    // Initial session loading
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setSession, setUser, setIsLoading]);

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
          <Route path="/conta" element={<Account />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal />
    </div>
  );
}

export default App;
