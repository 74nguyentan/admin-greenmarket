
import { ProductsRoutingModule } from './products-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ListProductsComponent } from './list-products.component';




@NgModule({
  declarations: [ProductsComponent, ListProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})

export class ProductsModule { }
