import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../context/CartContext'; // temporary type borrow

export interface CartItem {
    product: Product;
    quantity: number;
    selectedFinish: string;
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product, finish: string) => void;
    removeFromCart: (productId: string | number, finish: string) => void;
    updateQuantity: (productId: string | number, finish: string, delta: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            totalItems: 0,
            subtotal: 0,

            addToCart: (product, finish) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(
                    item => item.product.id === product.id && item.selectedFinish === finish
                );

                let newItems;
                if (existingItem) {
                    newItems = currentItems.map(item =>
                        item.product.id === product.id && item.selectedFinish === finish
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    newItems = [...currentItems, { product, quantity: 1, selectedFinish: finish }];
                }

                set({
                    items: newItems,
                    totalItems: newItems.reduce((acc, item) => acc + item.quantity, 0),
                    subtotal: calculateSubtotal(newItems)
                });
            },

            removeFromCart: (productId, finish) => {
                const newItems = get().items.filter(
                    item => !(item.product.id === productId && item.selectedFinish === finish)
                );

                set({
                    items: newItems,
                    totalItems: newItems.reduce((acc, item) => acc + item.quantity, 0),
                    subtotal: calculateSubtotal(newItems)
                });
            },

            updateQuantity: (productId, finish, delta) => {
                const currentItems = get().items;
                const newItems = currentItems.map(item => {
                    if (item.product.id === productId && item.selectedFinish === finish) {
                        const newQtd = Math.max(1, item.quantity + delta);
                        return { ...item, quantity: newQtd };
                    }
                    return item;
                });

                set({
                    items: newItems,
                    totalItems: newItems.reduce((acc, item) => acc + item.quantity, 0),
                    subtotal: calculateSubtotal(newItems)
                });
            },

            clearCart: () => set({ items: [], totalItems: 0, subtotal: 0 })
        }),
        {
            name: 'odara-cart-storage', // saves to localStorage so cart persists
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Helper function
function calculateSubtotal(items: CartItem[]): number {
    return items.reduce((acc, item) => {
        if (typeof item.product.price === 'number') {
            return acc + (item.product.price * item.quantity);
        }
        return acc;
    }, 0);
}
