import React from 'react';
import './Mostras.css';

export default function Mostras() {
    const mostras = [
        {
            id: 1,
            title: 'CASACOR São Paulo 2025',
            description: 'Ambiente "Raízes" assinado por arquitetos parceiros, destacando nossas peças em um formato imersivo.',
            image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000'
        },
        {
            id: 2,
            title: 'Design Weekend SP',
            description: 'Lançamento da Coleção Orgânica, com foco em linhas fluídas e inspiração na natureza brasileira.',
            image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=1000'
        },
        {
            id: 3,
            title: 'Mostra Artefacto Haddock Lobo',
            description: 'Participação especial com fornecimento de peças exclusivas em curadoria.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000'
        }
    ];

    return (
        <div className="mostras-page page animate-fade-in section-padding">
            <div className="container">
                <header className="page-header text-center mb-5">
                    <h1 className="page-title">Nossas Mostras</h1>
                    <p className="page-subtitle">Onde o design autoral Odara encontra a arquitetura e ganha vida.</p>
                </header>

                <div className="mostras-list">
                    {mostras.map((mostra, index) => (
                        <div key={mostra.id} className={`mostra-card ${index % 2 !== 0 ? 'reverse' : ''}`}>
                            <div className="mostra-image">
                                <img src={mostra.image} alt={mostra.title} />
                            </div>
                            <div className="mostra-info">
                                <h2>{mostra.title}</h2>
                                <p>{mostra.description}</p>
                                <button className="btn btn-outline mt-4">Ver Galeria Completa</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
