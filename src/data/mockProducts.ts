import { Product } from '@/types';
import sneaker1 from '@/assets/sneaker-1.jpg';
import sneaker2 from '@/assets/sneaker-2.jpg';
import sneaker3 from '@/assets/sneaker-3.jpg';
import sneaker4 from '@/assets/sneaker-4.jpg';
import sneaker5 from '@/assets/sneaker-5.jpg';
import sneaker6 from '@/assets/sneaker-6.jpg';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Air Max Classic White',
    brand: 'Nike',
    category: 'Zapatillas',
    type: 'Running',
    price: 129.99,
    originalPrice: 149.99,
    discount: 13,
    image: sneaker1,
    images: [sneaker1],
    description: 'Zapatillas deportivas clásicas en color blanco con detalles azules. Perfectas para running y uso diario.',
    availability: 'in-stock',
    stock: 25,
    rating: 4.8,
    reviews: 234
  },
  {
    id: '2',
    name: 'Revolution Pro Black',
    brand: 'Nike',
    category: 'Zapatillas',
    type: 'Running',
    price: 89.99,
    originalPrice: 109.99,
    discount: 18,
    image: sneaker2,
    images: [sneaker2],
    description: 'Zapatillas de running negras con tecnología de amortiguación avanzada y detalles rojos.',
    availability: 'in-stock',
    stock: 18,
    rating: 4.6,
    reviews: 189
  },
  {
    id: '3',
    name: 'Canvas High Top Navy',
    brand: 'Converse',
    category: 'Zapatillas',
    type: 'Casual',
    price: 79.99,
    image: sneaker3,
    images: [sneaker3],
    description: 'Zapatillas altas de lona en color azul marino. Estilo clásico y atemporal.',
    availability: 'in-stock',
    stock: 32,
    rating: 4.5,
    reviews: 156
  },
  {
    id: '4',
    name: 'Basketball Elite Pro',
    brand: 'Jordan',
    category: 'Zapatillas',
    type: 'Basketball',
    price: 199.99,
    originalPrice: 229.99,
    discount: 13,
    image: sneaker4,
    images: [sneaker4],
    description: 'Zapatillas de basketball de alta gama con colores vibrantes y tecnología de máximo rendimiento.',
    availability: 'limited',
    stock: 8,
    rating: 4.9,
    reviews: 312
  },
  {
    id: '5',
    name: 'Leather Casual Brown',
    brand: 'Clarks',
    category: 'Zapatillas',
    type: 'Casual',
    price: 149.99,
    image: sneaker5,
    images: [sneaker5],
    description: 'Zapatillas elegantes de cuero marrón. Perfectas para uso casual y semi-formal.',
    availability: 'in-stock',
    stock: 15,
    rating: 4.7,
    reviews: 97
  },
  {
    id: '6',
    name: 'Glam Pink Metallic',
    brand: 'Adidas',
    category: 'Zapatillas',
    type: 'Lifestyle',
    price: 119.99,
    originalPrice: 139.99,
    discount: 14,
    image: sneaker6,
    images: [sneaker6],
    description: 'Zapatillas femeninas en rosa con detalles metálicos. Estilo moderno y llamativo.',
    availability: 'in-stock',
    stock: 22,
    rating: 4.8,
    reviews: 201
  }
];

export const categories = Array.from(new Set(mockProducts.map(p => p.category)));
export const brands = Array.from(new Set(mockProducts.map(p => p.brand)));