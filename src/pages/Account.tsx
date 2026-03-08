import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { supabase } from '../services/supabase';
import { LogOut, Package, MapPin, Heart, User as UserIcon } from 'lucide-react';
import './Account.css';

export default function Account() {
    const { user, signOut, isLoading } = useUserStore();
    const navigate = useNavigate();

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
                        <button className="account-nav-item active">
                            <UserIcon size={20} /> Meus Dados
                        </button>
                        <button className="account-nav-item">
                            <Package size={20} /> Meus Pedidos
                        </button>
                        <button className="account-nav-item">
                            <MapPin size={20} /> Endereços
                        </button>
                        <button className="account-nav-item">
                            <Heart size={20} /> Lista de Desejos
                        </button>
                        <button className="account-nav-item logout-btn" onClick={handleSignOut}>
                            <LogOut size={20} /> Sair
                        </button>
                    </nav>
                </aside>

                <main className="account-content">
                    <section className="account-section">
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
                            <button className="btn btn-outline" style={{ marginTop: '1rem' }}>Editar Dados</button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
