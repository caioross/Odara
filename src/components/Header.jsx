import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header({ onOpenCart }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState('destaque');
    const { totalItems } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container container">

                {/* Mobile Menu Toggle */}
                <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Logo */}
                <Link to="/" className="logo">
                    <h1>ODARA</h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <ul className="nav-list">
                        <li
                            className="nav-item has-dropdown"
                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                            onMouseLeave={() => setIsMegaMenuOpen(false)}
                        >
                            <div className="nav-link" style={{ cursor: 'pointer' }} onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}>
                                Mobiliário <ChevronDown size={14} />
                            </div>

                            {/* Mega Menu */}
                            {isMegaMenuOpen && (
                                <div className="mega-menu" onMouseLeave={() => setHoveredCategory('destaque')}>
                                    <div className="mega-menu-content container">
                                        <div className="mega-column">
                                            <h3>Sala de Estar</h3>
                                            <Link to="/produtos?ambiente=sala-estar" onMouseEnter={() => setHoveredCategory('sofa')}>Sofás</Link>
                                            <Link to="/produtos?ambiente=sala-estar" onMouseEnter={() => setHoveredCategory('poltrona')}>Poltronas</Link>
                                            <Link to="/produtos?ambiente=sala-estar" onMouseEnter={() => setHoveredCategory('rack')}>Racks</Link>
                                            <Link to="/produtos?ambiente=sala-estar" onMouseEnter={() => setHoveredCategory('aparador')}>Aparadores</Link>
                                        </div>
                                        <div className="mega-column">
                                            <h3>Sala de Jantar</h3>
                                            <Link to="/produtos?ambiente=sala-jantar" onMouseEnter={() => setHoveredCategory('mesa')}>Mesas de Jantar</Link>
                                            <Link to="/produtos?ambiente=sala-jantar" onMouseEnter={() => setHoveredCategory('cadeira')}>Cadeiras</Link>
                                            <Link to="/produtos?ambiente=sala-jantar" onMouseEnter={() => setHoveredCategory('buffet')}>Buffets</Link>
                                        </div>
                                        <div className="mega-column">
                                            <h3>Armazenamento</h3>
                                            <Link to="/produtos?categoria=rack" onMouseEnter={() => setHoveredCategory('rack')}>Racks</Link>
                                            <Link to="/produtos?categoria=aparador" onMouseEnter={() => setHoveredCategory('aparador')}>Aparadores</Link>
                                            <Link to="/produtos?categoria=buffet" onMouseEnter={() => setHoveredCategory('aparador')}>Buffets</Link>
                                        </div>
                                        <div className="mega-column featured">
                                            {hoveredCategory === 'sofa' && <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400" alt="Sofá em destaque" />}
                                            {hoveredCategory === 'cadeira' && <img src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=400" alt="Cadeira em destaque" />}
                                            {hoveredCategory === 'poltrona' && <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400" alt="Poltrona em destaque" />}
                                            {hoveredCategory === 'rack' && <img src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=400" alt="Rack em destaque" />}
                                            {hoveredCategory === 'mesa' && <img src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=400" alt="Mesa em destaque" />}
                                            {hoveredCategory === 'destaque' && <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400" alt="Destaque Odara" />}
                                            {(hoveredCategory !== 'sofa' && hoveredCategory !== 'cadeira' && hoveredCategory !== 'poltrona' && hoveredCategory !== 'rack' && hoveredCategory !== 'mesa' && hoveredCategory !== 'destaque') && (
                                                <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400" alt="Destaque Odara" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li className="nav-item">
                            <Link to="/dna-odara" className="nav-link">DNA Odara</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/mostras" className="nav-link">Mostras</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/brasil-criativo" className="nav-link">Brasil Criativo</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/produtos?pronta-entrega=true" className="nav-link pronta-entrega" style={{ color: 'var(--color-terracota)', fontWeight: 'bold' }}>Pronta Entrega</Link>
                        </li>
                    </ul>
                </nav>

                {/* Actions */}
                <div className="header-actions">
                    <button className="cart-btn" onClick={onOpenCart} aria-label="Abrir carrinho">
                        <ShoppingBag size={24} />
                        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                    </button>
                </div>
            </div>
        </header>
    );
}
