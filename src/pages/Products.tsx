import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { categories } from '../data/mockProducts';
import { useProducts } from '../hooks/useProducts';
import PriceTag from '../components/PriceTag';
import { Product } from '../context/CartContext';
import './Products.css';
import './Products.css';

export default function Products() {
    const { data: products = [], isLoading } = useProducts();
    const [activeCategory, setActiveCategory] = useState('todos');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const location = useLocation();
    const navigate = useNavigate();

    // Handle URL query params for initial category selection
    useEffect(() => {
        if (!products.length) return;
        const params = new URLSearchParams(location.search);
        const categoryQuery = params.get('categoria');
        const ambienteQuery = params.get('ambiente');

        let result = products;

        if (ambienteQuery) {
            if (ambienteQuery === 'sala-estar') {
                result = products.filter(p => ['sofa', 'poltrona', 'rack', 'aparador'].includes(p.category));
                setActiveCategory('todos');
            } else if (ambienteQuery === 'sala-jantar') {
                result = products.filter(p => ['mesa-jantar', 'cadeira', 'buffet'].includes(p.category));
                setActiveCategory('todos');
            } else if (ambienteQuery === 'varanda') {
                result = products.filter(p => ['poltrona', 'banqueta', 'banco'].includes(p.category));
                setActiveCategory('todos');
            }
        } else if (categoryQuery) {
            if (categoryQuery === 'assentos') {
                result = products.filter(p => ['sofa', 'cadeira', 'poltrona', 'banqueta', 'banco'].includes(p.category));
                setActiveCategory('todos');
            } else if (categoryQuery === 'superficies') {
                result = products.filter(p => ['mesa-jantar', 'mesa-lateral', 'mesa-centro'].includes(p.category));
                setActiveCategory('todos');
            } else if (categoryQuery === 'armazenamento') {
                result = products.filter(p => ['rack', 'aparador', 'buffet'].includes(p.category));
                setActiveCategory('todos');
            } else {
                setActiveCategory(categoryQuery);
                result = products.filter(p => p.category === categoryQuery);
            }
        } else {
            setActiveCategory('todos');
        }

        setFilteredProducts(result);
    }, [location.search, products]);

    const handleCategoryFilter = (categoryId: string) => {
        setActiveCategory(categoryId);
        navigate(categoryId === 'todos' ? '/produtos' : `/produtos?categoria=${categoryId}`);
    };

    return (
        <div className="products-page page animate-fade-in section-padding">
            <Helmet>
                <title>Nossa Curadoria | Mobiliário Odara</title>
                <meta name="description" content="Explore nossa curadoria de mobiliário de luxo. Peças de design autoral brasileiro para salas de estar, jantar e varandas." />
            </Helmet>
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
                    {isLoading ? (
                        <div className="loading-products" style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem' }}>
                            <p>Carregando curadoria exclusiva...</p>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link to={`/produtos/${product.id}`} key={product.id} className="product-card">
                                <div className="product-image-wrapper">
                                    <img src={product.image} alt={product.name} className="product-img-main" />
                                    <img src={product.hoverImage} alt={`${product.name} detail`} className="product-img-hover" />
                                    <div className="product-badge">{product.collection}</div>
                                </div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <PriceTag
                                        price={product.price}
                                        isConsultationOnly={typeof product.price === 'string' && product.price.toLowerCase().includes('consulta')}
                                    />
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="no-products text-center" style={{ gridColumn: '1 / -1' }}>
                            <p>Nenhuma peça encontrada nesta categoria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
