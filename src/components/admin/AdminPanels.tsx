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

export function AdminCustomers() {
    return (
        <div className="admin-section">
            <div className="admin-header-flex">
                <h2>Clientes e CRM</h2>
                <button className="btn btn-primary">Adicionar Cliente</button>
            </div>

            <div className="admin-table-container mt-4">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Perfil / LTV</th>
                            <th>Pedidos</th>
                            <th>Última Compra</th>
                            <th className="text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Marina Silva</strong><br /><span className="text-small text-muted">marinasilva@email.com</span></td>
                            <td><span className="status-badge" style={{ backgroundColor: '#e6f4ea', color: '#137333' }}>Arquiteta VIP</span><br /><span className="text-small">R$ 142.500,00 LTV</span></td>
                            <td>12</td>
                            <td>07/03/2026</td>
                            <td className="admin-actions text-right">
                                <button className="action-btn" title="Visualizar Perfil"><Eye size={18} /></button>
                                <button className="action-btn" title="Editar"><Edit size={18} /></button>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Carlos Almeida</strong><br /><span className="text-small text-muted">carlos.alm@teste.com</span></td>
                            <td>Consumidor Final<br /><span className="text-small">R$ 4.200,00 LTV</span></td>
                            <td>1</td>
                            <td>08/03/2026</td>
                            <td className="admin-actions text-right">
                                <button className="action-btn" title="Visualizar Perfil"><Eye size={18} /></button>
                                <button className="action-btn" title="Editar"><Edit size={18} /></button>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Ana Paula Design</strong><br /><span className="text-small text-muted">ana@designstudio.com.br</span></td>
                            <td><span className="status-badge pending">Aprovação Pendente (CAU)</span><br /><span className="text-small">R$ 0,00 LTV</span></td>
                            <td>0</td>
                            <td>-</td>
                            <td className="admin-actions text-right">
                                <button className="action-btn" title="Visualizar Perfil"><Eye size={18} /></button>
                                <button className="action-btn" title="Aprovar Arquiteto"><ToggleRight size={20} color="#28a745" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function AdminMarketing() {
    return (
        <div className="admin-section">
            <div className="admin-header-flex">
                <h2>Marketing & Growth</h2>
                <button className="btn btn-primary">Novo Cupom de Desconto</button>
            </div>

            <div className="admin-stats-grid mt-4">
                <div className="stat-card">
                    <div className="stat-info">
                        <h3>Carrinhos Abandonados (24h)</h3>
                        <p style={{ color: 'var(--color-terracota)' }}>R$ 32.400,00</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-info">
                        <h3>Taxa de Recuperação</h3>
                        <p>12.5%</p>
                    </div>
                </div>
            </div>

            <h3 className="mt-4">Cupons Ativos</h3>
            <div className="admin-table-container mt-4">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Regra</th>
                            <th>Uso</th>
                            <th>Validade</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>WELCOME10</strong></td>
                            <td>10% OFF (Primeira Compra)</td>
                            <td>45 / Ilimitado</td>
                            <td>Sem validade</td>
                            <td><span className="stock-dot available" title="Ativo"></span> Ativo</td>
                        </tr>
                        <tr>
                            <td><strong>MOSTRA2026</strong></td>
                            <td>R$ 1.000 OFF nas cadeiras</td>
                            <td>2 / 50</td>
                            <td>30/04/2026</td>
                            <td><span className="stock-dot available" title="Ativo"></span> Ativo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function AdminLogistics() {
    return (
        <div className="admin-section">
            <h2>Logística e Fretes</h2>

            <div className="account-section animate-fade-in mt-4">
                <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Integrações de Entrega</h3>
                <div className="filter-group" style={{ justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #f5f5f5' }}>
                    <div>
                        <strong>Correios (PAC / Sedex)</strong>
                        <p className="text-small text-muted">Cálculo automático de cubagem via API oficial.</p>
                    </div>
                    <button className="action-btn active-toggle"><ToggleRight size={32} /></button>
                </div>
                <div className="filter-group" style={{ justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #f5f5f5' }}>
                    <div>
                        <strong>Melhor Envio</strong>
                        <p className="text-small text-muted">Transportadoras premium (JadLog, Azul Cargo).</p>
                    </div>
                    <button className="action-btn active-toggle"><ToggleRight size={32} /></button>
                </div>
                <div className="filter-group" style={{ justifyContent: 'space-between', padding: '15px 0' }}>
                    <div>
                        <strong>Frete Próprio (Transporte Especializado Odara)</strong>
                        <p className="text-small text-muted">Cálculo via Tabela CSV para móveis extra-grandes.</p>
                    </div>
                    <button className="action-btn active-toggle"><ToggleRight size={32} /></button>
                </div>
            </div>

            <div className="account-section animate-fade-in mt-4">
                <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Regras Manuais</h3>
                <div className="admin-filters-bar">
                    <div className="filter-group" style={{ width: '100%' }}>
                        <span style={{ minWidth: '150px' }}>Frete Grátis acima de:</span>
                        <input type="text" defaultValue="R$ 15.000,00" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '200px' }} />
                        <select>
                            <option>Sudeste e Sul</option>
                            <option>Brasil Inteiro</option>
                            <option>Apenas Estado SP</option>
                        </select>
                        <button className="btn btn-outline" style={{ padding: '8px 15px' }}>Salvar Regra</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AdminSettings() {
    return (
        <div className="admin-section">
            <h2>Configurações do E-commerce</h2>

            <div className="admin-stats-grid mt-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <div className="account-section animate-fade-in">
                    <h3>Dados da Loja</h3>
                    <div className="info-group mt-4">
                        <label>Nome da Loja</label>
                        <input type="text" defaultValue="Odara Design Autoral brasileiro" style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #eee' }} />
                    </div>
                    <div className="info-group mt-2">
                        <label>CNPJ de Faturamento</label>
                        <input type="text" defaultValue="00.000.000/0001-00" style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #eee' }} />
                    </div>
                    <div className="info-group mt-2">
                        <label>E-mail de Contato (Remetente)</label>
                        <input type="text" defaultValue="contato@odara.com.br" style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #eee' }} />
                    </div>
                    <button className="btn btn-primary mt-4">Salvar Dados</button>
                </div>

                <div className="account-section animate-fade-in">
                    <h3>Integrações e Analytics (Pixel/SEO)</h3>
                    <div className="info-group mt-4">
                        <label>Google Analytics 4 (Measurement ID)</label>
                        <input type="text" defaultValue="G-XYZ1234567" style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #eee' }} />
                        <span className="text-small text-muted">Injeta automaticamente o scrip global do GA4 no header.</span>
                    </div>
                    <div className="info-group mt-4">
                        <label>Meta Pixel ID (Facebook/Instagram)</label>
                        <input type="text" placeholder="Ex: 123456789012345" style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #eee' }} />
                        <span className="text-small text-muted">Crucial para disparo de eventos ViewContent, AddToCart, Purchase.</span>
                    </div>
                    <button className="btn btn-primary mt-4">Salvar Keys</button>
                </div>
            </div>

            <div className="account-section animate-fade-in mt-4" style={{ borderLeft: '4px solid var(--color-terracota)' }}>
                <h3>Ambiente de Pagamento</h3>
                <p className="mt-2 text-small">Gateways configurados de forma nativa pela Odara.</p>
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    <div style={{ flex: 1, padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                        <strong>Pagar.me (Recomendado)</strong>
                        <p className="text-small text-muted mt-2">Status: <span style={{ color: 'green' }}>Conectado (Produção)</span></p>
                        <button className="btn btn-outline mt-3">Ver Credenciais</button>
                    </div>
                    <div style={{ flex: 1, padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                        <strong>Stripe International</strong>
                        <p className="text-small text-muted mt-2">Status: Desativado</p>
                        <button className="btn btn-outline mt-3">Configurar API</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
