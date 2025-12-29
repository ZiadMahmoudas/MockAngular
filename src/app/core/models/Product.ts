export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Out of Stock';
}