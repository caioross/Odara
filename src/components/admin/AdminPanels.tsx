import { Box, Users, ShoppingCart, TrendingUp } from 'lucide-react';
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

export function ProductManagement() {
    return (
        <div className="admin-section">
            <div className="admin-header-flex">
                <h2>Gerenciar Produtos</h2>
                <button className="btn btn-primary">Adicionar Produto</button>
            </div>
            <div className="admin-table-container mt-4">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Coleção</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sofá Côncavo</td>
                            <td>Formas</td>
                            <td>R$ 12.500,00</td>
                            <td>Sob Encomenda</td>
                            <td><button className="btn-link">Editar</button></td>
                        </tr>
                        <tr>
                            <td>Mesa de Centro Orgânica</td>
                            <td>Terra</td>
                            <td>R$ 4.200,00</td>
                            <td>Disponível (5)</td>
                            <td><button className="btn-link">Editar</button></td>
                        </tr>
                        <tr>
                            <td>Poltrona Abraço</td>
                            <td>Conforto</td>
                            <td>Sob Consulta</td>
                            <td>Esgotado</td>
                            <td><button className="btn-link">Editar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
