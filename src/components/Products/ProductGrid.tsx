import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onQuickView?: (product: Product) => void;
}

export const ProductGrid = ({ products, isLoading, onQuickView }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="products-grid">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="product-card animate-pulse">
            <div className="w-full h-64 bg-muted rounded-t-lg"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No se encontraron productos
        </h3>
        <p className="text-muted-foreground">
          Intenta ajustar tus filtros o términos de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="products-grid fade-in">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};