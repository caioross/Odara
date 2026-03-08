import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { supabase } from '../services/supabase';
import { LogOut, Package, MapPin, Heart, User as UserIcon, Settings, BarChart, Users, Tag, Truck, ClipboardList } from 'lucide-react';
import { AdminOverview, ProductManagement, OrdersManagement, AdminCustomers, AdminMarketing, AdminLogistics, AdminSettings } from '../components/admin/AdminPanels';
import './Account.css';

export default function Account() {
    const { user, signOut, isLoading } = useUserStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    const isAdmin = user?.email === 'yanrossi107@hotmail.com';

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/');
        }
    }, [user, isLoading, navigate]);

    if (isLoading) {
        return <div className="account-loading">Carregando...</div>;
    }

    if (!user) {
        return null; // Will redirect via useEffect
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        signOut();
        navigate('/');
    };

    return (
        <div className="account-page container section-padding">
            <div className="account-header">
                <h1>Minha Conta</h1>
                <p>Bem-vindo, {user.user_metadata?.full_name || user.email}</p>
            </div>

            <div className="account-dashboard">
                <aside className="account-sidebar">
                    <nav className="account-nav">
                        <div className="nav-group-title">Minha Área</div>
                        <button className={`account-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                            <UserIcon size={20} /> Meus Dados
                        </button>
                        <button className={`account-nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                            <Package size={20} /> Meus Pedidos
                        </button>
                        <button className={`account-nav-item ${activeTab === 'addresses' ? 'active' : ''}`} onClick={() => setActiveTab('addresses')}>
                            <MapPin size={20} /> Endereços
                        </button>
                        <button className={`account-nav-item ${activeTab === 'wishlist' ? 'active' : ''}`} onClick={() => setActiveTab('wishlist')}>
                            <Heart size={20} /> Lista de Desejos
                        </button>

                        {isAdmin && (
                            <>
                                <div className="nav-group-title mt-4" style={{ color: 'var(--color-terracota)' }}>Administração</div>
                                <button className={`account-nav-item ${activeTab === 'admin-overview' ? 'active' : ''}`} onClick={() => setActiveTab('admin-overview')}>
                                    <BarChart size={20} /> Visão Geral
                                </button>
                                <button className={`account-nav-item ${activeTab === 'admin-products' ? 'active' : ''}`} onClick={() => setActiveTab('admin-products')}>
                                    <Package size={20} /> Produtos
                                </button>
                                <button className={`account-nav-item ${activeTab === 'admin-orders' ? 'active' : ''}`} onClick={() => setActiveTab('admin-orders')}>
                                    <ClipboardList size={20} /> Pedidos da Loja
                                </button>
                                <button className={`account-nav-item ${activeTab === 'admin-customers' ? 'active' : ''}`} onClick={() => setActiveTab('admin-customers')}>
                                    <Users size={20} /> Clientes & CRM
                                </button>
                                <button className={`account-nav-item ${activeTab === 'admin-marketing' ? 'active' : ''}`} onClick={() => setActiveTab('admin-marketing')}>
                                    <Tag size={20} /> Marketing
                                </button>
                                <button className={`account-nav-item ${activeTab === 'admin-logistics' ? 'active' : ''}`} onClick={() => setActiveTab('admin-logistics')}>
                                    <Truck size={20} /> Logística
                                </button>
                                <button className={`account-nav-item ${activeTab === 'admin-settings' ? 'active' : ''}`} onClick={() => setActiveTab('admin-settings')}>
                                    <Settings size={20} /> Configurações
                                </button>
                            </>
                        )}

                        <button className="account-nav-item logout-btn mt-4" onClick={handleSignOut}>
                            <LogOut size={20} /> Sair
                        </button>
                    </nav>
                </aside>

                <main className="account-content">
                    {activeTab === 'profile' && (
                        <section className="account-section animate-fade-in">
                            <h2>Informações Pessoais</h2>
                            <div className="info-card">
                                <div className="info-group">
                                    <label>Nome Completo</label>
                                    <p>{user.user_metadata?.full_name || 'Não informado'}</p>
                                </div>
                                <div className="info-group">
                                    <label>E-mail</label>
                                    <p>{user.email}</p>
                                </div>
                                <div className="info-group">
                                    <label>Nível de Acesso</label>
                                    <p style={{ fontWeight: 'bold', color: isAdmin ? 'var(--color-terracota)' : 'inherit' }}>
                                        {isAdmin ? 'Administrador do Sistema' : 'Cliente Especial'}
                                    </p>
                                </div>
                                <button className="btn btn-outline" style={{ marginTop: '1rem' }}>Editar Dados</button>
                            </div>
                        </section>
                    )}

                    {activeTab === 'orders' && (
                        <section className="account-section animate-fade-in">
                            <h2>Meus Pedidos</h2>
                            <p className="mt-4" style={{ color: 'var(--color-verde-medio)' }}>Você ainda não realizou nenhum pedido.</p>
                            <button className="btn btn-primary mt-4" onClick={() => navigate('/produtos')}>Explorar Coleções</button>
                        </section>
                    )}

                    {activeTab === 'addresses' && (
                        <section className="account-section animate-fade-in">
                            <h2>Endereços de Entrega</h2>
                            <p className="mt-4" style={{ color: 'var(--color-verde-medio)' }}>Nenhum endereço cadastrado.</p>
                            <button className="btn btn-outline mt-4">Adicionar Endereço</button>
                        </section>
                    )}

                    {activeTab === 'wishlist' && (
                        <section className="account-section animate-fade-in">
                            <h2>Minha Lista de Desejos</h2>
                            <p className="mt-4" style={{ color: 'var(--color-verde-medio)' }}>Sua lista de desejos está vazia.</p>
                        </section>
                    )}

                    {/* Admin Sections */}
                    {isAdmin && activeTab === 'admin-overview' && <AdminOverview />}
                    {isAdmin && activeTab === 'admin-products' && <ProductManagement />}
                    {isAdmin && activeTab === 'admin-orders' && <OrdersManagement />}
                    {isAdmin && activeTab === 'admin-customers' && <AdminCustomers />}
                    {isAdmin && activeTab === 'admin-marketing' && <AdminMarketing />}
                    {isAdmin && activeTab === 'admin-logistics' && <AdminLogistics />}
                    {isAdmin && activeTab === 'admin-settings' && <AdminSettings />}

                </main>
            </div>
        </div>
    );
}
