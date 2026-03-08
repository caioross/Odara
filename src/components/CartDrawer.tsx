import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { items: cartItems, removeFromCart, updateQuantity, subtotal } = useCartStore();

    if (!isOpen) return null;

    return (
        <>
            <div className="cart-overlay" onClick={onClose}></div>
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Sua Cesta</h2>
                    <button className="close-btn" onClick={onClose} aria-label="Fechar carrinho">
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart flex flex-col items-center justify-center h-full text-center p-8">
                            <div style={{ padding: '2rem', background: 'var(--color-gelo)', borderRadius: '50%', marginBottom: '1.5rem' }}>
                                <ShoppingBag size={48} color="var(--color-verde-medio)" strokeWidth={1} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-verde-intenso)', marginBottom: '1rem' }}>Sua cesta está vazia</h3>
                            <p style={{ color: 'var(--color-verde-medio)', marginBottom: '2rem', lineHeight: 1.5 }}>Descubra nossa curadoria de peças autorais e transforme seu ambiente com design brasileiro.</p>
                            <button className="btn btn-primary" onClick={onClose}>
                                Explorar Coleções
                            </button>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={`${item.product.id}-${item.selectedFinish}`} className="cart-item">
                                    <img src={item.product.image} alt={item.product.name} className="item-image" />
                                    <div className="item-details">
                                        <h3>{item.product.name}</h3>
                                        <p className="item-finish">{item.selectedFinish}</p>

                                        <div className="item-quantity-controls mt-2">
                                            <button onClick={() => updateQuantity(item.product.id, item.selectedFinish, -1)} aria-label="Diminuir quantidade"><Minus size={14} /></button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.product.id, item.selectedFinish, 1)} aria-label="Aumentar quantidade"><Plus size={14} /></button>
                                        </div>

                                        <div className="item-actions mt-2">
                                            <span className="item-price">{item.product.price}</span>
                                            <button className="remove-item" onClick={() => removeFromCart(item.product.id, item.selectedFinish)} aria-label="Remover item"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="cart-footer">
                    {cartItems.length > 0 && (
                        <div className="cart-subtotal mb-3">
                            <span className="subtotal-label">Subtotal</span>
                            <span className="subtotal-value">
                                {subtotal > 0 ? `R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'Sob Consulta'}
                            </span>
                        </div>
                    )}
                    <button className="btn btn-primary btn-full" onClick={() => alert('Orçamento solicitado!')}>
                        Solicitar Orçamento
                    </button>
                    <button className="btn btn-outline btn-full mt-2" onClick={onClose}>
                        Continuar Explorando
                    </button>
                </div>
            </div>
        </>
    );
}
