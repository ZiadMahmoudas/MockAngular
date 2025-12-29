import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private nextId = 6;
  
  // Initial mock products
  private initialProducts: Product[] = [
    { id: 1, name: 'Laptop Dell XPS', price: 25000, stock: 5, status: 'In Stock' },
    { id: 2, name: 'iPhone 15 Pro', price: 35000, stock: 0, status: 'Out of Stock' },
    { id: 3, name: 'Samsung Galaxy S24', price: 28000, stock: 8, status: 'In Stock' },
    { id: 4, name: 'iPad Air', price: 15000, stock: 3, status: 'In Stock' },
    { id: 5, name: 'AirPods Pro', price: 7500, stock: 0, status: 'Out of Stock' }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.initialProducts);
  public products$ = this.productsSubject.asObservable();

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.productsSubject.value);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.productsSubject.value.find(p => p.id === id);
    return of(product);
  }

  addProduct(product: Omit<Product, 'id' | 'status'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: this.nextId++,
      status: product.stock > 0 ? 'In Stock' : 'Out of Stock'
    };

    const currentProducts = this.productsSubject.value;
    this.productsSubject.next([...currentProducts, newProduct]);

    return of(newProduct);
  }


  deleteProduct(id: number): Observable<boolean> {
    const currentProducts = this.productsSubject.value;
    const filteredProducts = currentProducts.filter(p => p.id !== id);
    
    if (filteredProducts.length === currentProducts.length) {
      return of(false);
    }

    this.productsSubject.next(filteredProducts);
    return of(true);
  }
}