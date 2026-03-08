import { useQuery } from '@tanstack/react-query';
import { ProductsService } from '../services/ProductsService';

export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => ProductsService.getProducts(),
    });
}

export function useProduct(slugOrId: string | undefined) {
    return useQuery({
        queryKey: ['product', slugOrId],
        queryFn: () => slugOrId ? ProductsService.getProductBySlug(slugOrId) : null,
        enabled: !!slugOrId,
    });
}

export function useProductSearch(query: string) {
    return useQuery({
        queryKey: ['product-search', query],
        queryFn: () => ProductsService.searchProducts(query),
        enabled: query.length > 2, // only search if > 2 chars
    });
}
