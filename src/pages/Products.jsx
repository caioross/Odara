import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { mockProducts, categories } from '../data/mockProducts';
import './Products.css';

export default function Products() {
    const [activeCategory, setActiveCategory] = useState('todos');
    const [filteredProducts, setFilteredProducts] = useState(mockProducts);
    const location = useLocation();
    const navigate = useNavigate();

    // Handle URL query params for initial category selection
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryQuery = params.get('categoria');
        const ambienteQuery = params.get('ambiente');

        if (ambienteQuery) {
            if (ambienteQuery === 'sala-estar') {
                setFilteredProducts(mockProducts.filter(p => ['sofa', 'poltrona', 'rack', 'aparador'].includes(p.category)));
                setActiveCategory('todos');
            } else if (ambienteQuery === 'sala-jantar') {
                setFilteredProducts(mockProducts.filter(p => ['mesa-jantar', 'cadeira', 'buffet'].includes(p.category)));
                setActiveCategory('todos');
            } else if (ambienteQuery === 'varanda') {
                setFilteredProducts(mockProducts.filter(p => ['poltrona', 'banqueta', 'banco'].includes(p.category)));
                setActiveCategory('todos');
            }
        } else if (categoryQuery) {
            if (categoryQuery === 'assentos') {
                setFilteredProducts(mockProducts.filter(p => ['sofa', 'cadeira', 'poltrona', 'banqueta', 'banco'].includes(p.category)));
                setActiveCategory('todos');
            } else if (categoryQuery === 'superficies') {
                setFilteredProducts(mockProducts.filter(p => ['mesa-jantar', 'mesa-lateral', 'mesa-centro'].includes(p.category)));
                setActiveCategory('todos');
            } else if (categoryQuery === 'armazenamento') {
                setFilteredProducts(mockProducts.filter(p => ['rack', 'aparador', 'buffet'].includes(p.category)));
                setActiveCategory('todos');
            } else {
                setActiveCategory(categoryQuery);
                setFilteredProducts(mockProducts.filter(p => p.category === categoryQuery));
            }
        } else {
            setActiveCategory('todos');
            setFilteredProducts(mockProducts);
        }
    }, [location.search]);

    const handleCategoryFilter = (categoryId) => {
        setActiveCategory(categoryId);
        navigate(categoryId === 'todos' ? '/produtos' : `/produtos?categoria=${categoryId}`);
    };

    return (
        <div className="products-page page animate-fade-in section-padding">
            <div className="container">
                <header className="products-header text-center">
                    <h1 className="page-title">Nossa Curadoria</h1>
                    <p className="page-subtitle">A excelência do design autoral brasileiro em cada detalhe.</p>
                </header>

                {/* Filter Navigation */}
                <nav className="category-filters">
                    <ul>
                        {categories.map((cat) => (
                            <li key={cat.id}>
                                <button
                                    className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => handleCategoryFilter(cat.id)}
                                >
                                    {cat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Product Grid */}
                <div className="product-grid mt-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link to={`/produtos/${product.id}`} key={product.id} className="product-card">
                                <div className="product-image-wrapper">
                                    <img src={product.image} alt={product.name} className="product-img-main" />
                                    <img src={product.hoverImage} alt={`${product.name} detail`} className="product-img-hover" />
                                    <div className="product-badge">{product.collection}</div>
                                </div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.price}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="no-products text-center">
                            <p>Nenhuma peça encontrada nesta categoria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
