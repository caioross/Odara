import { useState, useMemo } from 'react';
import { Box, Users, ShoppingCart, TrendingUp, Edit, Trash2, Eye, ToggleLeft, ToggleRight, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X } from 'lucide-react';
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

// Helper Generic Modal
const AdminModal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
                <button className="admin-modal-close" onClick={onClose}><X size={24} /></button>
                <div className="admin-modal-header">
                    <h2>{title}</h2>
                </div>
                <div className="admin-modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

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

    // Modal State
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean, mode: 'view' | 'edit', product: AdminProduct | null }>({ isOpen: false, mode: 'view', product: null });

    const openModal = (product: AdminProduct, mode: 'view' | 'edit') => {
        setModalConfig({ isOpen: true, mode, product });
    };

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
                                    <button className="action-btn" title="Visualizar" onClick={() => openModal(product, 'view')}><Eye size={18} /></button>
                                    <button className="action-btn" title="Editar" onClick={() => openModal(product, 'edit')}><Edit size={18} /></button>
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

            {/* Product Modal */}
            <AdminModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.mode === 'edit' ? 'Editar Produto' : 'Detalhes do Produto'}
            >
                {modalConfig.product && (
                    <div className="modal-grid-2">
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>Nome do Produto</label>
                            {modalConfig.mode === 'view' ? <p>{modalConfig.product.name}</p> : <input type="text" defaultValue={modalConfig.product.name} />}
                        </div>
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>SKU (Código)</label>
                            {modalConfig.mode === 'view' ? <p>{modalConfig.product.id}</p> : <input type="text" defaultValue={modalConfig.product.id} disabled />}
                        </div>
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>Indústria</label>
                            {modalConfig.mode === 'view' ? <p>{modalConfig.product.industry}</p> : (
                                <select defaultValue={modalConfig.product.industry}>
                                    <option>Odara Fábrica</option>
                                    <option>Estúdio Mula</option>
                                    <option>Sollos</option>
                                    <option>Jacarandá</option>
                                </select>
                            )}
                        </div>
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>Coleção</label>
                            {modalConfig.mode === 'view' ? <p>{modalConfig.product.collection}</p> : (
                                <select defaultValue={modalConfig.product.collection}>
                                    <option>Formas</option>
                                    <option>Terra</option>
                                    <option>Conforto</option>
                                    <option>Essenciais</option>
                                </select>
                            )}
                        </div>
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>Preço Base (R$)</label>
                            {modalConfig.mode === 'view' ? <p>{formatCurrency(modalConfig.product.basePrice)}</p> : <input type="number" defaultValue={modalConfig.product.basePrice} />}
                        </div>
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>Estoque Atual</label>
                            {modalConfig.mode === 'view' ? <p>{modalConfig.product.stockQuantity} unid.</p> : <input type="number" defaultValue={modalConfig.product.stockQuantity} />}
                        </div>
                        <div className="modal-info-group readonly" style={{ gridColumn: '1 / -1' }}>
                            <label>Status</label>
                            <p>{modalConfig.product.active ? 'Ativo e visível na loja' : 'Desabilitado'}</p>
                        </div>
                        {modalConfig.mode === 'edit' && (
                            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '10px' }}>
                                <button className="btn btn-outline" onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}>Cancelar</button>
                                <button className="btn btn-primary" onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}>Salvar Alterações</button>
                            </div>
                        )}
                    </div>
                )}
            </AdminModal>
        </div>
    );
}

const mockOrders = [
    { id: '10045', client: 'Carlos Almeida', date: '08/03/2026', status: 'Aguardando Pagamento', total: 4200 },
    { id: '10044', client: 'Marina Silva (Arquiteta)', date: '07/03/2026', status: 'Pago - Em Produção', total: 14500 }
];

export function OrdersManagement() {
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean, order: any | null }>({ isOpen: false, order: null });

    const openModal = (order: any) => {
        setModalConfig({ isOpen: true, order });
    };

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
                        {mockOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.client}</td>
                                <td>{order.date}</td>
                                <td>
                                    <span className={`status-badge ${order.status.includes('Pago') ? 'paid' : 'pending'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-link" onClick={() => openModal(order)}>Ver Detalhes</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AdminModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={`Detalhes do Pedido #${modalConfig.order?.id}`}
            >
                {modalConfig.order && (
                    <div className="modal-grid-2">
                        <div className="modal-info-group readonly">
                            <label>Cliente</label>
                            <p>{modalConfig.order.client}</p>
                        </div>
                        <div className="modal-info-group readonly">
                            <label>Data da Compra</label>
                            <p>{modalConfig.order.date}</p>
                        </div>
                        <div className="modal-info-group readonly">
                            <label>Valor Total</label>
                            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(modalConfig.order.total)}</p>
                        </div>
                        <div className="modal-info-group readonly">
                            <label>Status</label>
                            <p>{modalConfig.order.status}</p>
                        </div>
                    </div>
                )}
            </AdminModal>
        </div>
    );
}

const mockCustomers = [
    { id: 'C001', name: 'Marina Silva', email: 'marinasilva@email.com', profile: 'Arquiteta VIP', ltv: 142500, orders: 12, lastPurchase: '07/03/2026', status: 'approved' },
    { id: 'C002', name: 'Carlos Almeida', email: 'carlos.alm@teste.com', profile: 'Consumidor Final', ltv: 4200, orders: 1, lastPurchase: '08/03/2026', status: 'approved' },
    { id: 'C003', name: 'Ana Paula Design', email: 'ana@designstudio.com.br', profile: 'Aprovação Pendente (CAU)', ltv: 0, orders: 0, lastPurchase: '-', status: 'pending' }
];

export function AdminCustomers() {
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean, mode: 'view' | 'edit', customer: any | null }>({ isOpen: false, mode: 'view', customer: null });

    const openModal = (customer: any, mode: 'view' | 'edit') => {
        setModalConfig({ isOpen: true, mode, customer });
    };

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
                        {mockCustomers.map(customer => (
                            <tr key={customer.id}>
                                <td><strong>{customer.name}</strong><br /><span className="text-small text-muted">{customer.email}</span></td>
                                <td>
                                    {customer.status === 'pending' ? (
                                        <span className="status-badge pending">{customer.profile}</span>
                                    ) : (
                                        <span className="status-badge" style={customer.profile.includes('VIP') ? { backgroundColor: '#e6f4ea', color: '#137333' } : {}}>{customer.profile}</span>
                                    )}
                                    <br /><span className="text-small">R$ {customer.ltv.toLocaleString('pt-BR')} LTV</span>
                                </td>
                                <td>{customer.orders}</td>
                                <td>{customer.lastPurchase}</td>
                                <td className="admin-actions text-right">
                                    <button className="action-btn" title="Visualizar Perfil" onClick={() => openModal(customer, 'view')}><Eye size={18} /></button>
                                    {customer.status === 'pending' ? (
                                        <button className="action-btn" title="Aprovar Arquiteto"><ToggleRight size={20} color="#28a745" /></button>
                                    ) : (
                                        <button className="action-btn" title="Editar" onClick={() => openModal(customer, 'edit')}><Edit size={18} /></button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Customer Modal */}
            <AdminModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.mode === 'edit' ? 'Editar Cliente' : 'Perfil do Cliente'}
            >
                {modalConfig.customer && (
                    <div className="modal-grid-2">
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>Nome Completo</label>
                            {modalConfig.mode === 'view' ? <p>{modalConfig.customer.name}</p> : <input type="text" defaultValue={modalConfig.customer.name} />}
                        </div>
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>E-mail</label>
                            {modalConfig.mode === 'view' ? <p>{modalConfig.customer.email}</p> : <input type="email" defaultValue={modalConfig.customer.email} />}
                        </div>
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>Perfil de Cliente</label>
                            {modalConfig.mode === 'view' ? <p>{modalConfig.customer.profile}</p> : (
                                <select defaultValue={modalConfig.customer.profile}>
                                    <option>Consumidor Final</option>
                                    <option>Arquiteto VIP</option>
                                    <option>Aprovação Pendente (CAU)</option>
                                    <option>Parceiro B2B</option>
                                </select>
                            )}
                        </div>
                        <div className="modal-info-group readonly">
                            <label>Lifetime Value (LTV)</label>
                            <p>R$ {modalConfig.customer.ltv.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="modal-info-group readonly">
                            <label>Total de Pedidos</label>
                            <p>{modalConfig.customer.orders} pedidos na loja</p>
                        </div>

                        {modalConfig.mode === 'edit' && (
                            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '10px' }}>
                                <button className="btn btn-outline" onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}>Cancelar</button>
                                <button className="btn btn-primary" onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}>Salvar CRM</button>
                            </div>
                        )}
                    </div>
                )}
            </AdminModal>
        </div>
    );
}

const mockCoupons = [
    { id: 'MK01', code: 'WELCOME10', rule: '10% OFF (Primeira Compra)', usage: '45', limit: 'Ilimitado', expiry: 'Sem validade', status: 'Ativo' },
    { id: 'MK02', code: 'MOSTRA2026', rule: 'R$ 1.000 OFF nas cadeiras', usage: '2', limit: '50', expiry: '30/04/2026', status: 'Ativo' }
];

export function AdminMarketing() {
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean, mode: 'view' | 'edit', coupon: any | null }>({ isOpen: false, mode: 'view', coupon: null });

    const openModal = (coupon: any, mode: 'view' | 'edit') => {
        setModalConfig({ isOpen: true, mode, coupon });
    };

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
                            <th className="text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockCoupons.map(coupon => (
                            <tr key={coupon.id}>
                                <td><strong>{coupon.code}</strong></td>
                                <td>{coupon.rule}</td>
                                <td>{coupon.usage} / {coupon.limit}</td>
                                <td>{coupon.expiry}</td>
                                <td><span className={`stock-dot ${coupon.status === 'Ativo' ? 'available' : 'out'}`} title={coupon.status}></span> {coupon.status}</td>
                                <td className="admin-actions text-right">
                                    <button className="action-btn" title="Visualizar" onClick={() => openModal(coupon, 'view')}><Eye size={18} /></button>
                                    <button className="action-btn" title="Editar" onClick={() => openModal(coupon, 'edit')}><Edit size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AdminModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.mode === 'edit' ? 'Editar Cupom' : 'Detalhes do Cupom'}
            >
                {modalConfig.coupon && (
                    <div className="modal-grid-2">
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>Código do Cupom</label>
                            {modalConfig.mode === 'view' ? <p>{modalConfig.coupon.code}</p> : <input type="text" defaultValue={modalConfig.coupon.code} />}
                        </div>
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>Regra do Desconto</label>
                            {modalConfig.mode === 'view' ? <p>{modalConfig.coupon.rule}</p> : <input type="text" defaultValue={modalConfig.coupon.rule} />}
                        </div>
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>Limite de Uso</label>
                            {modalConfig.mode === 'view' ? <p>{modalConfig.coupon.limit}</p> : <input type="text" defaultValue={modalConfig.coupon.limit} />}
                        </div>
                        <div className={`modal-info-group ${modalConfig.mode === 'view' ? 'readonly' : ''}`}>
                            <label>Validade Exata</label>
                            {modalConfig.mode === 'view' ? <p>{modalConfig.coupon.expiry}</p> : <input type="text" defaultValue={modalConfig.coupon.expiry} />}
                        </div>
                        <div className="modal-info-group readonly" style={{ gridColumn: '1 / -1' }}>
                            <label>Uso Analítico Atual</label>
                            <p>{modalConfig.coupon.usage} conversões realizadas com sucesso.</p>
                        </div>
                        {modalConfig.mode === 'edit' && (
                            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '10px' }}>
                                <button className="btn btn-outline" onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}>Cancelar</button>
                                <button className="btn btn-primary" onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}>Salvar Cupom</button>
                            </div>
                        )}
                    </div>
                )}
            </AdminModal>
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
