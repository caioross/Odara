import React, { useEffect } from 'react';
import './DnaOdara.css';

export default function DnaOdara() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="dna-odara-page">
            {/* Hero Section */}
            <section className="dna-hero">
                <div className="dna-hero-bg">
                    <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000" alt="Ambiente Odara" />
                    <div className="dna-overlay"></div>
                </div>
                <div className="dna-hero-content">
                    <h1 className="animate-fade-in-up">O DNA Odara</h1>
                    <p className="animate-fade-in-up delay-1">Design autoral brasileiro pensado para o seu ambiente.</p>
                </div>
            </section>

            {/* Concept Outline */}
            <section className="dna-concept-section container">
                <div className="dna-concept-grid">
                    <div className="dna-concept-text">
                        <span className="section-subtitle">Nossa Essência</span>
                        <h2>A proporção perfeita entre forma, função e brasilidade.</h2>
                        <p>
                            Entendemos que o luxo contemporâneo não grita, ele é sentido. O DNA Odara
                            é composto por curadoria apurada, design limpo, valorização de materiais
                            naturais e a celebração do design autoral brasileiro.
                        </p>
                        <p>
                            Acreditamos que cada peça deve conversar com o ambiente, não apenas ocupá-lo.
                            Nossas linhas orgânicas e acabamentos refinados convidam ao toque e ao uso,
                            transformando o mobiliário em uma extensão da sua identidade.
                        </p>
                    </div>
                    <div className="dna-concept-image">
                        <div className="organic-shape-mask mask-alt">
                            <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=800" alt="Detalhe de design brasileiro" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Integration with Ambients */}
            <section className="dna-integration-section">
                <div className="container">
                    <div className="dna-integration-header">
                        <h2>Seu Ambiente, Nosso Design</h2>
                        <p>Veja como as peças Odara se integram perfeitamente a diferentes propostas de interiores.</p>
                    </div>

                    <div className="dna-gallery-grid">
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800" alt="Sala de Estar" />
                            <div className="gallery-caption">Integração Leveza e Conforto</div>
                        </div>
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=800" alt="Sala de Jantar" />
                            <div className="gallery-caption">O Centro das Celebrações</div>
                        </div>
                        <div className="gallery-item row-span-2">
                            <img src="https://images.unsplash.com/photo-1628189859546-24bb188ced5e?auto=format&fit=crop&q=80&w=800" alt="Home Office" />
                            <div className="gallery-caption">Minimalismo e Foco</div>
                        </div>
                        <div className="gallery-item col-span-2">
                            <img src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200" alt="Varanda" />
                            <div className="gallery-caption">Exterior Contemporâneo</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
