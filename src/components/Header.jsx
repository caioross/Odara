import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';

export default function Header({ onOpenCart }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

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
                            <Link to="/produtos" className="nav-link">
                                Mobiliário <ChevronDown size={14} />
                            </Link>

                            {/* Mega Menu */}
                            {isMegaMenuOpen && (
                                <div className="mega-menu">
                                    <div className="mega-menu-content container">
                                        <div className="mega-column">
                                            <h3>Assentos</h3>
                                            <Link to="/produtos?categoria=sofa">Sofás</Link>
                                            <Link to="/produtos?categoria=cadeira">Cadeiras</Link>
                                            <Link to="/produtos?categoria=poltrona">Poltronas</Link>
                                            <Link to="/produtos?categoria=banqueta">Banquetas</Link>
                                            <Link to="/produtos?categoria=banco">Bancos</Link>
                                        </div>
                                        <div className="mega-column">
                                            <h3>Superfícies</h3>
                                            <Link to="/produtos?categoria=mesa-jantar">Mesas de Jantar</Link>
                                            <Link to="/produtos?categoria=mesa-centro">Mesas de Centro</Link>
                                            <Link to="/produtos?categoria=mesa-lateral">Mesas Laterais</Link>
                                            <Link to="/produtos?categoria=escrivaninha">Escrivaninhas</Link>
                                        </div>
                                        <div className="mega-column">
                                            <h3>Armazenamento</h3>
                                            <Link to="/produtos?categoria=rack">Racks</Link>
                                            <Link to="/produtos?categoria=aparador">Aparadores</Link>
                                            <Link to="/produtos?categoria=buffet">Buffets</Link>
                                        </div>
                                        <div className="mega-column featured">
                                            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400" alt="Destaque" />
                                            <h4>Coleção Orgânica</h4>
                                            <Link to="/produtos?colecao=organica" className="btn-link">Ver Coleção</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li className="nav-item">
                            <Link to="/mostras" className="nav-link">Mostras</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/brasil-criativo" className="nav-link">Brasil Criativo</Link>
                        </li>
                        <li className="nav-item">
                            <a href="https://3dwarehouse.sketchup.com/org/dfd6b8e9-2ed0-4d9c-a771-41466c457cf8/Odara" target="_blank" rel="noopener noreferrer" className="nav-link">3D Warehouse</a>
                        </li>
                    </ul>
                </nav>

                {/* Actions */}
                <div className="header-actions">
                    <button className="cart-btn" onClick={onOpenCart} aria-label="Abrir carrinho">
                        <ShoppingBag size={24} />
                        <span className="cart-count">0</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
