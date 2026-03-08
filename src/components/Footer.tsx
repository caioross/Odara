import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer section-padding">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="logo">
                            <h1>ODARA</h1>
                        </Link>
                        <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                            A excelência do design autoral brasileiro.<br />
                            Mobiliário handcrafted com curadoria exclusiva.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h3>Navegação</h3>
                        <ul>
                            <li><Link to="/dna-odara">DNA Odara</Link></li>
                            <li><Link to="/produtos">Nossa Curadoria</Link></li>
                            <li><Link to="/produtos?pronta-entrega=true">Pronta Entrega</Link></li>
                            <li><Link to="/mostras">Nossas Mostras</Link></li>
                            <li><Link to="/brasil-criativo">Brasil Criativo</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3>Contato</h3>
                        <ul>
                            <li><MapPin size={16} /> Al. Gabriel Monteiro da Silva, SP</li>
                            <li><Phone size={16} /> (11) 99999-9999</li>
                            <li><Mail size={16} /> contato@odara.com.br</li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h3>Newsletter</h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '10px' }}>Receba novidades e convites para mostras exclusivas.</p>
                        <form className="newsletter-form mt-2" onSubmit={(e) => { e.preventDefault(); alert('Inscrito com sucesso!'); }}>
                            <input type="email" placeholder="Seu e-mail" required />
                            <button type="submit" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Assinar</button>
                        </form>
                        <div className="social-links mt-4">
                            <a href="https://instagram.com/odara" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                            <a href="#" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom mt-5">
                    <p>&copy; {new Date().getFullYear()} Odara. Design Autoral Brasileiro. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
