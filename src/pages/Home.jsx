import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Home.css';

export default function Home() {
    return (
        <div className="home page animate-fade-in">
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
                            <h2>Curadoria de Excelência</h2>
                            <p>
                                A Odara transcende o mobiliário; é uma celebração das raízes brasileiras através do design de alto padrão.
                                Nossas peças são mais do que móveis, são esculturas funcionais concebidas com matérias-primas nobres e um cuidado artesanal que reflete o verdadeiro luxo.
                            </p>
                            <Link to="/mostras" className="btn-link with-arrow">
                                Conheça Nossas Mostras <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="featured-categories section-padding bg-light">
                <div className="container text-center">
                    <h2 className="section-title">Nossas Categorias</h2>
                    <p className="section-subtitle">Descubra peças de assinatura que transformarão sua casa.</p>

                    <div className="categories-grid mt-4">
                        <Link to="/produtos?categoria=assentos" className="category-card">
                            <div className="category-image">
                                <img src="https://images.unsplash.com/photo-1540574163026-643ea20d25b5?auto=format&fit=crop&q=80&w=600" alt="Assentos" />
                                <div className="category-overlay">
                                    <h3>Assentos</h3>
                                </div>
                            </div>
                        </Link>

                        <Link to="/produtos?categoria=superficies" className="category-card">
                            <div className="category-image">
                                <img src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600" alt="Superfícies" />
                                <div className="category-overlay">
                                    <h3>Superfícies</h3>
                                </div>
                            </div>
                        </Link>

                        <Link to="/produtos?categoria=armazenamento" className="category-card">
                            <div className="category-image">
                                <img src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=600" alt="Armazenamento" />
                                <div className="category-overlay">
                                    <h3>Armazenamento</h3>
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
