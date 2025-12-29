import { Component } from '@angular/core';
import { Product } from '../../models/Product';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
 products: Product[] = [];
  productForm: FormGroup;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      stock: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.currentUser = this.authService.getCurrentUser();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  addProduct(): void {
    if (this.productForm.invalid) return;
    
    this.productService.addProduct(this.productForm.value).subscribe(() => {
      this.loadProducts();
      this.productForm.reset();
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
