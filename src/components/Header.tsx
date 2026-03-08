import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, ChevronDown, User, Search } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useCartStore } from '../store/useCartStore';
import { useProductSearch } from '../hooks/useProducts';
import './Header.css';

interface HeaderProps {
    onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState('destaque');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { data: searchResults = [], isLoading: isSearchLoading } = useProductSearch(searchQuery);

    const totalItems = useCartStore((state) => state.totalItems);
    const { user, openAuthModal } = useUserStore();
    const navigate = useNavigate();

    const handleUserClick = () => {
        if (user) {
            navigate('/conta');
        } else {
            openAuthModal();
        }
    };

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
                    <button className="search-btn" onClick={() => setIsSearchOpen(true)} aria-label="Pesquisar" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-verde-intenso)' }}>
                        <Search size={22} />
                    </button>
                    <button className="user-btn" onClick={handleUserClick} aria-label="Minha Conta" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-verde-intenso)' }}>
                        <User size={24} />
                    </button>
                    <button className="cart-btn" onClick={onOpenCart} aria-label="Abrir carrinho">
                        <ShoppingBag size={24} />
                        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                    </button>
                </div>
            </div>

            {/* Omnibar Search Overlay */}
            {isSearchOpen && (
                <div className="search-overlay" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'var(--color-creme)', padding: '2rem 0', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', zIndex: 100 }}>
                    <div className="container" style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Buscar mobílias, designers, coleções..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                            style={{ width: '100%', padding: '15px 20px', fontSize: '1.2rem', border: '1px solid var(--color-verde-medio)', borderRadius: '4px', backgroundColor: 'transparent', color: 'var(--color-verde-intenso)' }}
                        />
                        <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} style={{ position: 'absolute', right: '35px', top: '18px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-verde-intenso)' }}>
                            <X size={24} />
                        </button>

                        {searchQuery.length > 2 && (
                            <div className="search-results" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                                {isSearchLoading ? (
                                    <p style={{ gridColumn: '1 / -1', color: 'var(--color-verde-medio)' }}>Buscando...</p>
                                ) : searchResults.length > 0 ? (
                                    searchResults.slice(0, 4).map(product => (
                                        <Link
                                            key={product.id}
                                            to={`/produtos/${product.id}`}
                                            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />
                                            <h4 style={{ fontSize: '1rem', color: 'var(--color-verde-intenso)', marginBottom: '5px' }}>{product.name}</h4>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--color-verde-medio)' }}>Coleção {product.collection}</p>
                                        </Link>
                                    ))
                                ) : (
                                    <p style={{ gridColumn: '1 / -1', color: 'var(--color-verde-medio)' }}>Nenhum resultado encontrado para "{searchQuery}".</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
