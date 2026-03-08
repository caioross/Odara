import { useState } from 'react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { supabase } from '../services/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import './AuthModal.css';

export default function AuthModal() {
    const { isAuthModalOpen, closeAuthModal, setUser, setSession } = useUserStore();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                setUser(data.user);
                setSession(data.session);
                closeAuthModal();
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        }
                    }
                });
                if (error) throw error;
                if (data.user?.identities?.length === 0) {
                    setError('Email já cadastrado. Faça login.');
                } else {
                    alert('Cadastro realizado! Verifique seu e-mail para confirmar a conta (se aplicável), ou você já está logado.');
                    if (data.session) {
                        setUser(data.user);
                        setSession(data.session);
                        closeAuthModal();
                    } else {
                        setIsLogin(true);
                    }
                }
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro durante a autenticação.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isAuthModalOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="auth-overlay"
                        onClick={closeAuthModal}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="auth-modal"
                    >
                        <button className="auth-close-btn" onClick={closeAuthModal}>
                            <X size={24} />
                        </button>

                        <div className="auth-header">
                            <h2>{isLogin ? 'Bem-vindo de volta' : 'Criar Conta'}</h2>
                            <p>
                                {isLogin
                                    ? 'Acesse sua conta para visualizar seus pedidos e lista de desejos.'
                                    : 'Junte-se a nós para uma experiência de design exclusivo.'}
                            </p>
                        </div>

                        {error && <div className="auth-error">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            {!isLogin && (
                                <div className="input-group">
                                    <UserIcon size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        placeholder="Nome Completo"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            <div className="input-group">
                                <Mail size={20} className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <Lock size={20} className="input-icon" />
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-full mt-2" disabled={loading}>
                                {loading ? 'Aguarde...' : (isLogin ? 'Entrar' : 'Cadastrar')}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <button className="text-btn toggle-auth" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                                {isLogin ? 'Ainda não possui conta? Cadastre-se' : 'Já possui conta? Faça login'}
                            </button>
                            {isLogin && (
                                <button className="text-btn forgot-password mt-2">
                                    Esqueceu sua senha?
                                </button>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
