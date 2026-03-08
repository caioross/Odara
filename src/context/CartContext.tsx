import { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
    id: number;
    name: string;
    category: string;
    collection: string;
    price: string;
    numericPrice?: number;
    image: string;
    hoverImage: string;
    availableFinishes: string[];
    finishesImages: { name: string; hex: string }[];
    dimensions: string;
    warehouseUrl?: string;
}

export interface CartItem extends Product {
    finish: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, finish: string) => void;
    removeFromCart: (productId: number, finish: string) => void;
    updateQuantity: (productId: number, finish: string, delta: number) => void;
    totalItems: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product, finish: string) => {
        setCartItems(prev => {
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

    const removeFromCart = (productId: number, finish: string) => {
        setCartItems(prev => prev.filter(item => !(item.id === productId && item.finish === finish)));
    };

    const updateQuantity = (productId: number, finish: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === productId && item.finish === finish) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.numericPrice || 0) * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalItems, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}
