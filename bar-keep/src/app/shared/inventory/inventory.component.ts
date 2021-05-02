import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(
    private productService: ProductsService,
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
  }

}
