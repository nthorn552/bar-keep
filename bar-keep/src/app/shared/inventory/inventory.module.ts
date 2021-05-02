import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';

@NgModule({
  declarations: [
    InventoryComponent,
    AddInventoryComponent,
    InventoryListComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    InventoryComponent
  ]
})

export class InventoryModule { }
