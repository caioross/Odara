import { useState, useMemo } from 'react';
import { Box, Users, ShoppingCart, TrendingUp, Edit, Trash2, Eye, ToggleLeft, ToggleRight, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import './Admin.css';

export function AdminOverview() {
    return (
        <div className="admin-section">
            <h2>Visão Geral do E-commerce</h2>
            <div className="admin-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon"><TrendingUp size={24} /></div>
                    <div className="stat-info">
                        <h3>Vendas Totais</h3>
                        <p>R$ 45.230,00</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><ShoppingCart size={24} /></div>
                    <div className="stat-info">
                        <h3>Pedidos Pendentes</h3>
                        <p>12</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><Users size={24} /></div>
                    <div className="stat-info">
                        <h3>Novos Clientes</h3>
                        <p>148</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><Box size={24} /></div>
                    <div className="stat-info">
                        <h3>Produtos Ativos</h3>
                        <p>87</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface AdminProduct {
    id: string;
    name: string;
    industry: string;
    collection: string;
    basePrice: number;
    stockStatus: 'available' | 'low' | 'out_of_stock' | 'made_to_order';
    stockQuantity?: number;
    active: boolean;
}

const mockProducts: AdminProduct[] = Array.from({ length: 115 }).map((_, i) => ({
    id: `PROD-${String(i + 1).padStart(4, '0')}`,
    name: `Móvel de Design ${i + 1}`,
    industry: ['Odara Fábrica', 'Estúdio Mula', 'Sollos', 'Jacarandá'][Math.floor(Math.random() * 4)],
    collection: ['Formas', 'Terra', 'Conforto', 'Essenciais'][Math.floor(Math.random() * 4)],
    basePrice: Math.floor(Math.random() * 15000) + 1500,
    stockStatus: ['available', 'low', 'out_of_stock', 'made_to_order'][Math.floor(Math.random() * 4)] as any,
    stockQuantity: Math.floor(Math.random() * 20),
    active: Math.random() > 0.1
}));

export function ProductManagement() {
    const [products, setProducts] = useState<AdminProduct[]>(mockProducts);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(30);

    // Sorting
    const [sortConfig, setSortConfig] = useState<{ key: keyof AdminProduct; direction: 'asc' | 'desc' } | null>(null);

    // Filtering
    const [filterCollection, setFilterCollection] = useState('');
    const [filterStock, setFilterStock] = useState('');
    const [filterIndustry, setFilterIndustry] = useState('');

    const handleSort = (key: keyof AdminProduct) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const toggleProductStatus = (id: string) => {
        setProducts(products.map(p => p.id === id ? { ...p, active: !p.active } : p));
    };

    const sortedProducts = useMemo(() => {
        let sortableProducts = [...products];

        // Apply Filters
        if (filterCollection) {
            sortableProducts = sortableProducts.filter(p => p.collection === filterCollection);
        }
        if (filterStock) {
            sortableProducts = sortableProducts.filter(p => p.stockStatus === filterStock);
        }
        if (filterIndustry) {
            sortableProducts = sortableProducts.filter(p => p.industry === filterIndustry);
        }

        // Apply Sorting
        if (sortConfig !== null) {
            const { key, direction } = sortConfig;
            sortableProducts.sort((a, b) => {
                const valA = a[key] ?? '';
                const valB = b[key] ?? '';
                if (valA < valB) return direction === 'asc' ? -1 : 1;
                if (valA > valB) return direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableProducts;
    }, [products, sortConfig, filterCollection, filterStock, filterIndustry]);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const getStockBadge = (status: string) => {
        switch (status) {
            case 'available': return <span className="stock-dot available" title="Disponível"></span>;
            case 'low': return <span className="stock-dot low" title="Baixo Estoque"></span>;
            case 'out_of_stock': return <span className="stock-dot out" title="Esgotado"></span>;
            case 'made_to_order': return <span className="stock-dot order" title="Sob Encomenda"></span>;
            default: return null;
        }
    };

    const SortIcon = ({ columnKey }: { columnKey: keyof AdminProduct }) => {
        if (sortConfig?.key !== columnKey) return <ChevronDown size={14} className="sort-icon inactive" />;
        return sortConfig.direction === 'asc' ? <ChevronUp size={14} className="sort-icon active" /> : <ChevronDown size={14} className="sort-icon active" />;
    };

    return (
        <div className="admin-section">
            <div className="admin-header-flex">
                <h2>Gerenciar Produtos</h2>
                <button className="btn btn-primary">Adicionar Produto</button>
            </div>

            {/* Filters Bar */}
            <div className="admin-filters-bar mt-4">
                <div className="filter-group">
                    <Filter size={16} />
                    <select value={filterCollection} onChange={(e) => { setFilterCollection(e.target.value); setCurrentPage(1); }}>
                        <option value="">Todas as Coleções</option>
                        <option value="Formas">Formas</option>
                        <option value="Terra">Terra</option>
                        <option value="Conforto">Conforto</option>
                        <option value="Essenciais">Essenciais</option>
                    </select>
                </div>
                <div className="filter-group">
                    <select value={filterIndustry} onChange={(e) => { setFilterIndustry(e.target.value); setCurrentPage(1); }}>
                        <option value="">Todas as Indústrias</option>
                        <option value="Odara Fábrica">Odara Fábrica</option>
                        <option value="Estúdio Mula">Estúdio Mula</option>
                        <option value="Sollos">Sollos</option>
                        <option value="Jacarandá">Jacarandá</option>
                    </select>
                </div>
                <div className="filter-group">
                    <select value={filterStock} onChange={(e) => { setFilterStock(e.target.value); setCurrentPage(1); }}>
                        <option value="">Status do Estoque</option>
                        <option value="available">Disponível</option>
                        <option value="low">Baixo Estoque</option>
                        <option value="out_of_stock">Esgotado</option>
                        <option value="made_to_order">Sob Encomenda</option>
                    </select>
                </div>
            </div>

            <div className="admin-table-container mt-4">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')} className="sortable-header">
                                Produto <SortIcon columnKey="name" />
                            </th>
                            <th onClick={() => handleSort('industry')} className="sortable-header">
                                Indústria <SortIcon columnKey="industry" />
                            </th>
                            <th onClick={() => handleSort('collection')} className="sortable-header">
                                Coleção <SortIcon columnKey="collection" />
                            </th>
                            <th onClick={() => handleSort('basePrice')} className="sortable-header">
                                Preço Base <SortIcon columnKey="basePrice" />
                            </th>
                            <th onClick={() => handleSort('stockStatus')} className="sortable-header text-center">
                                Estoque <SortIcon columnKey="stockStatus" />
                            </th>
                            <th className="text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((product) => (
                            <tr key={product.id} className={!product.active ? 'inactive-row' : ''}>
                                <td><strong>{product.name}</strong><br /><span className="text-small text-muted">{product.id}</span></td>
                                <td>{product.industry}</td>
                                <td>{product.collection}</td>
                                <td>{formatCurrency(product.basePrice)}</td>
                                <td className="text-center">{getStockBadge(product.stockStatus)}</td>
                                <td className="admin-actions text-right">
                                    <button className="action-btn" title="Visualizar"><Eye size={18} /></button>
                                    <button className="action-btn" title="Editar"><Edit size={18} /></button>
                                    <button className="action-btn" title="Excluir"><Trash2 size={18} /></button>
                                    <button className={`action-btn ${product.active ? 'active-toggle' : 'inactive-toggle'}`}
                                        onClick={() => toggleProductStatus(product.id)}
                                        title={product.active ? 'Desabilitar' : 'Habilitar'}>
                                        {product.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {currentItems.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-5">Nenhum produto encontrado com estes filtros.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {sortedProducts.length > 0 && (
                <div className="admin-pagination mt-4">
                    <div className="pagination-info">
                        Exibindo {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, sortedProducts.length)} de {sortedProducts.length} produtos
                    </div>
                    <div className="pagination-controls">
                        <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="items-per-page">
                            <option value={10}>10 por pág.</option>
                            <option value={30}>30 por pág.</option>
                            <option value={50}>50 por pág.</option>
                            <option value={100}>100 por pág.</option>
                        </select>
                        <div className="page-buttons">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="page-btn"><ChevronLeft size={18} /></button>
                            <span className="page-current">{currentPage} de {totalPages}</span>
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="page-btn"><ChevronRight size={18} /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export function OrdersManagement() {
    return (
        <div className="admin-section">
            <h2>Gerenciar Pedidos</h2>
            <div className="admin-table-container mt-4">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Pedido #</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>10045</td>
                            <td>Carlos Almeida</td>
                            <td>08/03/2026</td>
                            <td><span className="status-badge pending">Aguardando Pagamento</span></td>
                            <td><button className="btn-link">Ver Detalhes</button></td>
                        </tr>
                        <tr>
                            <td>10044</td>
                            <td>Marina Silva (Arquiteta)</td>
                            <td>07/03/2026</td>
                            <td><span className="status-badge paid">Pago - Em Produção</span></td>
                            <td><button className="btn-link">Ver Detalhes</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
