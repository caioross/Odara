import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose }) {
    const { cartItems, removeFromCart } = useCart();

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
                        <div className="empty-cart">
                            <p>Sua cesta está vazia.</p>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={`${item.id}-${item.finish}`} className="cart-item">
                                    <img src={item.image} alt={item.name} className="item-image" />
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p className="item-finish">{item.finish} {item.quantity > 1 ? `(x${item.quantity})` : ''}</p>
                                        <div className="item-actions">
                                            <span className="item-price">{item.price}</span>
                                            <button className="remove-item" onClick={() => removeFromCart(item.id, item.finish)}><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="cart-footer">
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
