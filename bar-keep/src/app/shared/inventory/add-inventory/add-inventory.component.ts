import { Component, Input, OnInit } from '@angular/core';
import Product from 'src/app/core/models/Product';

@Component({
  selector: 'add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

  @Input() availableProducts: Product[] = [{
    id: 'test',
    name: "test"
  }];

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
