export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  type: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  description: string;
  availability: 'in-stock' | 'out-of-stock' | 'limited';
  stock: number;
  rating?: number;
  reviews?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer' | 'guest';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  availability: string[];
}