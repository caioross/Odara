
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import './Home.css';

export default function Home() {
    return (
        <div className="home page animate-fade-in">
            <Helmet>
                <title>Odara | A Essência do Design Autoral Brasileiro</title>
                <meta name="description" content="Mobiliário handcrafted com curadoria exclusiva. Luxo, brasilidade e formas orgânicas para ambientes sofisticados." />
            </Helmet>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <img
                        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
                        alt="Mobiliário Luxo Odara"
                    />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content container">
                    <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        A Essência do Design <br />Autoral Brasileiro
                    </h1>
                    <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        Mobiliário handcrafted com curadoria exclusiva. Luxo, brasilidade e formas orgânicas para ambientes sofisticados.
                    </p>
                    <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <Link to="/produtos" className="btn btn-primary">
                            Explorar Coleção
                        </Link>
                    </div>
                </div>
            </section>

            {/* Brand Concept Section */}
            <section className="brand-concept section-padding">
                <div className="container">
                    <div className="concept-grid">
                        <div className="concept-image">
                            <div className="organic-shape-mask">
                                <img
                                    src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800"
                                    alt="Design Handcrafted"
                                />
                            </div>
                        </div>
                        <div className="concept-text">
                            <h2>O DNA Odara</h2>
                            <p>
                                A Odara transcende o mobiliário; é uma celebração das raízes brasileiras através do design de alto padrão.
                                O nosso DNA é composto por curadoria apurada, design limpo, valorização de materiais
                                naturais e a celebração do design autoral brasileiro. Entenda como nossas peças
                                se integram ao seu ambiente.
                            </p>
                            <Link to="/dna-odara" className="btn-link with-arrow">
                                Conheça nosso DNA <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Environments */}
            <section className="featured-categories section-padding bg-light">
                <div className="container text-center">
                    <h2 className="section-title">Ambientes</h2>
                    <p className="section-subtitle">Encontre a inspiração perfeita para cada espaço do seu projeto.</p>

                    <div className="categories-grid mt-4">
                        <Link to="/produtos?ambiente=sala-estar" className="category-card">
                            <div className="category-image">
                                <img src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=600" alt="Sala de Estar" />
                                <div className="category-overlay">
                                    <h3>Sala de Estar</h3>
                                </div>
                            </div>
                        </Link>

                        <Link to="/produtos?ambiente=sala-jantar" className="category-card">
                            <div className="category-image">
                                <img src="https://images.unsplash.com/photo-1617255140683-de017bd68b5a?auto=format&fit=crop&q=80&w=600" alt="Sala de Jantar" />
                                <div className="category-overlay">
                                    <h3>Sala de Jantar</h3>
                                </div>
                            </div>
                        </Link>

                        <Link to="/produtos?ambiente=varanda" className="category-card">
                            <div className="category-image">
                                <img src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=600" alt="Varanda" />
                                <div className="category-overlay">
                                    <h3>Varanda</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Brasil Criativo Highlight */}
            <section className="brasil-criativo-highlight section-padding text-center">
                <div className="container">
                    <div className="bc-content">
                        <h2 className="title-megante">Brasil Criativo</h2>
                        <p>O Design de Empreendedoras. O futuro da Odara, reunindo talentos do Brasil todo em uma mostra experiencial em São Paulo.</p>
                        <Link to="/brasil-criativo" className="btn btn-outline mt-4">
                            Descubra o Projeto
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
