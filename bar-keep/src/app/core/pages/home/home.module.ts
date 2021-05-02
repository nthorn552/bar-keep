import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { InventoryModule } from 'src/app/shared/inventory/inventory.module';

@NgModule({
  imports: [
    CommonModule,
    InventoryModule
  ],
  declarations: [HomeComponent]
})

export class HomeModule {}
