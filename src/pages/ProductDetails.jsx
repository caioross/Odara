import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Box, Download } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState('');
    const [selectedFinish, setSelectedFinish] = useState('');

    useEffect(() => {
        // Find product by id (in a real app, from API)
        const foundProduct = mockProducts.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setActiveImage(foundProduct.image);
            if (foundProduct.availableFinishes.length > 0) {
                setSelectedFinish(foundProduct.availableFinishes[0]);
            }
        }
    }, [id]);

    if (!product) {
        return (
            <div className="page section-padding text-center">
                <h2>Carregando produto ou não encontrado...</h2>
                <Link to="/produtos" className="btn-link mt-4">Voltar para o Catálogo</Link>
            </div>
        );
    }

    const gallery = [product.image, product.hoverImage]; // Mock gallery

    const handleAddToCart = () => {
        addToCart(product, selectedFinish);
        alert(`Adicionado ao carrinho: ${product.name} - Acabamento: ${selectedFinish} `);
    };

    return (
        <div className="product-details-page page animate-fade-in section-padding">
            <div className="container">

                <div className="breadcrumbs mb-4">
                    <Link to="/produtos" className="back-link">
                        <ArrowLeft size={16} /> Voltar para Coleção
                    </Link>
                </div>

                <div className="details-grid">
                    {/* Gallery */}
                    <div className="product-gallery">
                        <div className="main-image">
                            <img src={activeImage} alt={product.name} />
                        </div>
                        {gallery.length > 1 && (
                            <div className="thumbnails">
                                {gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        className={`thumbnail - btn ${activeImage === img ? 'active' : ''} `}
                                        onClick={() => setActiveImage(img)}
                                        aria-label={`Ver imagem ${idx + 1} `}
                                    >
                                        <img src={img} alt={`${product.name} vista ${idx + 1} `} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="product-info-panel">
                        <div className="product-header">
                            <span className="collection-tag">Coleção {product.collection}</span>
                            <h1 className="product-title">{product.name}</h1>
                            <p className="product-price">{product.price}</p>
                        </div>

                        <div className="product-description">
                            <p>
                                Peça de design autoral brasileiro com formas pensadas para aliar estética e conforto absoluto.
                                Confeccionada com os melhores materiais para garantir durabilidade e sofisticação ao seu ambiente.
                            </p>
                        </div>

                        {/* Options */}
                        <div className="product-options">
                            <div className="option-group">
                                <h3>Acabamentos Disponíveis</h3>
                                <div className="finishes-list">
                                    {product.availableFinishes.map((finish, idx) => (
                                        <button
                                            key={idx}
                                            className={`finish - btn ${selectedFinish === finish ? 'active' : ''} `}
                                            onClick={() => setSelectedFinish(finish)}
                                        >
                                            {finish}
                                        </button>
                                    ))}
                                </div>
                                {/* Visual Finish Swatches (if available in mock) */}
                                {product.finishesImages && product.finishesImages.length > 0 && (
                                    <div className="swatches mt-4">
                                        {product.finishesImages.map((swatch, idx) => (
                                            <div key={idx} className="swatch-item">
                                                <span className="swatch-color" style={{ backgroundColor: swatch.hex }}></span>
                                                {swatch.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="option-group">
                                <h3>Medidas</h3>
                                <p className="dimensions">{product.dimensions}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="product-actions mt-4">
                            <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
                                Adicionar à Cesta
                            </button>
                        </div>

                        {/* External Links */}
                        <div className="product-links mt-4">
                            {product.warehouseUrl && (
                                <a href={product.warehouseUrl} target="_blank" rel="noopener noreferrer" className="external-btn">
                                    <Box size={20} /> Ver Modelo 3D (3D Warehouse) <ExternalLink size={16} />
                                </a>
                            )}
                            {/* Added DWG mockup link since customer requested it */}
                            <a href="#" onClick={(e) => { e.preventDefault(); alert('Download do arquivo DWG iniciado.'); }} className="external-btn mt-2">
                                <Download size={20} /> Baixar Arquivo em DWG <ExternalLink size={16} />
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
