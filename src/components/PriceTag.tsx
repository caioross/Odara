import './PriceTag.css';

interface PriceTagProps {
    price: number | string;
    oldPrice?: number | string;
    isConsultationOnly?: boolean;
    className?: string;
}

export default function PriceTag({ price, oldPrice, isConsultationOnly = true, className = '' }: PriceTagProps) {

    if (isConsultationOnly) {
        return (
            <div className={`price-tag consultation ${className}`}>
                <span className="price-label">Preço sob consulta</span>
            </div>
        );
    }

    const formattedPrice = typeof price === 'number'
        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
        : price;

    const formattedOldPrice = typeof oldPrice === 'number'
        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(oldPrice)
        : oldPrice;

    return (
        <div className={`price-tag ${className}`}>
            {oldPrice && (
                <span className="old-price">{formattedOldPrice}</span>
            )}
            <span className="current-price">{formattedPrice}</span>
            {oldPrice && (
                <span className="discount-badge">Promoção</span>
            )}
        </div>
    );
}
