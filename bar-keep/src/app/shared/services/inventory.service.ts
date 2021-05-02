import { Injectable } from '@angular/core';
import Inventory from 'src/app/core/models/Inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  inventory: Inventory[] = [];

  addToInventory(newInventory: Inventory) {
    this.inventory.push(newInventory);
  }

  getInventory() {
    return this.inventory
  }

  clearInventory() {
    this.inventory = [];
    return this.inventory;
  }

}
