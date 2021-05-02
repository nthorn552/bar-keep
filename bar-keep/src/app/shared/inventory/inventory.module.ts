import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { InventoryComponent } from './inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InventoryComponent,
    AddInventoryComponent,
    InventoryListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  exports: [
    InventoryComponent
  ]
})

export class InventoryModule { }
