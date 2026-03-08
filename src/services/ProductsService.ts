import { supabase } from './supabase';
import { mockProducts } from '../data/mockProducts';
import { Product } from '../context/CartContext';

export const ProductsService = {
    async getProducts(): Promise<Product[]> {
        try {
            // Tenta buscar do Supabase primeiro
            const { data, error } = await supabase.from('products').select('*');

            // Se não houver tabela ou der erro, usa os mocks (Fallback Gracioso para DEV e transição)
            if (error || !data || data.length === 0) {
                // Simulando delay de rede para loading states na transição
                return new Promise((resolve) => setTimeout(() => resolve(mockProducts), 500));
            }

            return data as Product[];
        } catch (e) {
            console.warn("Supabase fetch failed, using fallback standard catalog...");
            return mockProducts;
        }
    },

    async getProductBySlug(idOrSlug: string): Promise<Product | null> {
        const all = await this.getProducts();
        return all.find(p => p.id.toString() === idOrSlug.toString()) || null; // Simplified logic assuming id is slug right now
    },

    async searchProducts(query: string): Promise<Product[]> {
        const all = await this.getProducts();
        if (!query) return [];
        const lowerQuery = query.toLowerCase();
        return all.filter(p => p.name.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery));
    }
};
