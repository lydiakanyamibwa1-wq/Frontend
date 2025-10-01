export type Product = {
  id: string;
  title: string;
  image: string;
  category?: string;   // made optional, backend may not send it
  price: number;
  compareAt?: number;
  rating?: number;     // made optional
  reviews?: number;    // made optional
  description?: string; 
  badge?: { label: string; color: string };
  tag?: 'featured' | 'popular' | 'new';
};

// Keep this as fallback dummy data
export const products: Product[] = [
  {
    id: 'p1',
    title: 'Noise Cancelling Headphones ZX-500',
    image: 'https://picsum.photos/600/400?random=101',
    category: 'Headphones',
    price: 129.99,
    compareAt: 169.99,
    rating: 4,
    reviews: 182,
    description: 'Wireless over-ear ANC headphones with 30h battery.',
    badge: { label: 'SALE', color: '#ef4444' },
    tag: 'featured',
  },
  {
    id: 'p2',
    title: '4K Smart TV 55” Ultra HDR',
    image: 'https://picsum.photos/600/400?random=102',
    category: 'TVs',
    price: 599.0,
    compareAt: 749.0,
    rating: 5,
    reviews: 324,
    description: 'Crisp 4K panel with HDR10+ and streaming apps.',
    badge: { label: 'HOT', color: '#f59e0b' },
    tag: 'popular',
  },
  {
    id: 'p3',
    title: 'Gaming Laptop RTX 4060',
    image: 'https://picsum.photos/600/400?random=103',
    category: 'Laptops',
    price: 1299.99,
    rating: 4,
    reviews: 91,
    description: '14-core CPU, RTX graphics, 165Hz display.',
    tag: 'featured',
  },
  {
    id: 'p4',
    title: 'Smartwatch Pro S',
    image: 'https://picsum.photos/600/400?random=104',
    category: 'Wearables',
    price: 219.0,
    compareAt: 259.0,
    rating: 4,
    reviews: 54,
    description: 'AMOLED display, GPS, 7-day battery life.',
    badge: { label: 'NEW', color: '#10b981' },
    tag: 'new',
  },
  {
    id: 'p5',
    title: 'Mirrorless Camera 24MP',
    image: 'https://picsum.photos/600/400?random=105',
    category: 'Cameras',
    price: 799.0,
    rating: 5,
    reviews: 40,
    description: 'Fast autofocus, compact body, 4K30 video.',
    tag: 'popular',
  },
  {
    id: 'p6',
    title: 'Bluetooth Speaker Mini',
    image: 'https://picsum.photos/600/400?random=106',
    category: 'Speakers',
    price: 39.99,
    rating: 4,
    reviews: 213,
    description: 'Pocket-sized speaker with punchy bass.',
    tag: 'new',
  },
];
