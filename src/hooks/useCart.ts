import { useState, useEffect } from 'react';
import { Product, CartItem, Cart } from '@/types';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    subtotal: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevCart.items, { product, quantity }];
      }

      const subtotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      return {
        items: newItems,
        subtotal,
        total: subtotal, // Add tax calculation here if needed
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      const subtotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      return {
        items: newItems,
        subtotal,
        total: subtotal,
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );

      const subtotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      return {
        items: newItems,
        subtotal,
        total: subtotal,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      subtotal: 0,
    });
  };

  const getItemCount = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
  };
};