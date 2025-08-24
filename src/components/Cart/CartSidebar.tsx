import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would integrate with your payment provider
    alert('Redirigiendo a la pasarela de pagos...');
    setIsCheckingOut(false);
  };

  const handleWhatsAppOrder = () => {
    const orderDetails = cart.items.map(item => 
      `${item.product.name} - Cantidad: ${item.quantity} - ${formatPrice(item.product.price * item.quantity)}`
    ).join('\n');
    
    const message = `¡Hola! Me interesa realizar el siguiente pedido:\n\n${orderDetails}\n\nTotal: ${formatPrice(cart.total)}\n\n¿Podrían confirmar disponibilidad y tiempo de entrega?`;
    
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-md bg-background
        border-l border-border z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-foreground" />
            <h2 className="text-lg font-semibold text-foreground">
              Carrito ({cart.items.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost p-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Agrega algunos productos para comenzar tu compra
              </p>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cart.items.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-muted"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.product.brand}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {cart.items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors py-2"
                >
                  Vaciar carrito
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>{formatPrice(cart.total)}</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full btn-primary"
              >
                {isCheckingOut ? 'Procesando...' : 'Proceder al pago'}
              </button>
              
              <button
                onClick={handleWhatsAppOrder}
                className="w-full btn-secondary"
              >
                Consultar por WhatsApp
              </button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Los precios incluyen impuestos. Envío calculado en el checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
};