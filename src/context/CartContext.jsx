import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, finish) => {
        setCartItems(prev => {
            // Check if item already exists in cart with same finish
            const existing = prev.find(item => item.id === product.id && item.finish === finish);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id && item.finish === finish
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, finish, quantity: 1 }];
        });
    };

    const removeFromCart = (productId, finish) => {
        setCartItems(prev => prev.filter(item => !(item.id === productId && item.finish === finish)));
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalItems }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
