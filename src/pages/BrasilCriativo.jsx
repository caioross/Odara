import React from 'react';
import { Sparkles, MapPin, Users } from 'lucide-react';
import './BrasilCriativo.css';

export default function BrasilCriativo() {
    return (
        <div className="bc-page page animate-fade-in">
            {/* Hero */}
            <section className="bc-hero">
                <div className="bc-hero-bg">
                    <img src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=2000" alt="Brasil Criativo" />
                    <div className="overlay"></div>
                </div>
                <div className="bc-hero-content text-center">
                    <h1 className="bc-title">Brasil Criativo</h1>
                    <p className="bc-subtitle">de Empreendedoras</p>
                </div>
            </section>

            {/* Intro */}
            <section className="bc-intro section-padding">
                <div className="container text-center">
                    <div className="max-w-800 mx-auto">
                        <Sparkles size={32} className="text-terracota mb-4 mx-auto" style={{ color: 'var(--color-terracota)', margin: '0 auto 24px' }} />
                        <h2 className="section-title">Um Programa Experimental</h2>
                        <p className="section-subtitle">
                            O Brasil Criativo não é apenas uma mostra; é um movimento. Uma casa conceito em São Paulo
                            destinada a abrigar mostras de design integrado, celebrando a força e o talento de empreendedoras do Brasil todo.
                        </p>
                        <p className="mt-4 text-green">
                            Nosso objetivo é lançar peças novas com a assinatura Odara em colaboração com mentes brilhantes,
                            criando um espaço vivo de curadoria tradicional aliada à experimentação audaciosa.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pillars */}
            <section className="bc-pillars section-padding bg-light">
                <div className="container">
                    <div className="pillars-grid">
                        <div className="pillar-card text-center">
                            <div className="icon-wrapper">
                                <Users size={32} />
                            </div>
                            <h3>Empreendedorismo Feminino</h3>
                            <p>Dar palco e voz para mulheres designers transformarem o cenário nacional.</p>
                        </div>

                        <div className="pillar-card text-center">
                            <div className="icon-wrapper">
                                <Sparkles size={32} />
                            </div>
                            <h3>Design Integrado</h3>
                            <p>Uma fusão de disciplinas: mobiliário, arte, arquitetura e paisagismo convergindo em um só lugar.</p>
                        </div>

                        <div className="pillar-card text-center">
                            <div className="icon-wrapper">
                                <MapPin size={32} />
                            </div>
                            <h3>Casa Conceito (SP)</h3>
                            <p>O local físico para trocas, exposições imersivas e lançamentos de peças colecionáveis exclusivas Odara.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Future Call */}
            <section className="bc-future section-padding text-center">
                <div className="container">
                    <h2>O Futuro está sendo desenhado.</h2>
                    <p className="mb-4">Em breve, abriremos as portas para esta nova fase da Odara.</p>
                    <button className="btn btn-primary" onClick={() => alert('Inscrição na newsletter do projeto!')}>
                        Receber Atualizações
                    </button>
                </div>
            </section>
        </div>
    );
}
