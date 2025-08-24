import { useState } from 'react';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addToCart(product);
      // You could add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'in-stock':
        return 'En stock';
      case 'limited':
        return 'Stock limitado';
      case 'out-of-stock':
        return 'Agotado';
      default:
        return 'Disponibilidad desconocida';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock':
        return 'text-success';
      case 'limited':
        return 'text-warning';
      case 'out-of-stock':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div
      className="product-card group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-sm font-medium">
            -{product.discount}%
          </div>
        )}

        {/* Quick Actions */}
        <div className={`absolute top-3 right-3 space-y-2 transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className="bg-background/90 hover:bg-background text-foreground p-2 rounded-lg shadow-md transition-all duration-200">
            <Heart className="h-4 w-4" />
          </button>
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="bg-background/90 hover:bg-background text-foreground p-2 rounded-lg shadow-md transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Availability Indicator */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-sm font-medium ${getAvailabilityColor(product.availability)}`}>
            {getAvailabilityText(product.availability)}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground font-medium">{product.brand}</span>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating!)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.availability === 'out-of-stock' || isLoading}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            product.availability === 'out-of-stock'
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'btn-primary hover:scale-105'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          {isLoading ? 'Agregando...' : product.availability === 'out-of-stock' ? 'Agotado' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
};