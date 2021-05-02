import { Injectable } from '@angular/core';
import Product from 'src/app/core/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[] = [];

  addProducts(newProducts: Product[]) {
    this.products.push(...newProducts);
  }

  getProducts() {
    return this.products
  }

}
