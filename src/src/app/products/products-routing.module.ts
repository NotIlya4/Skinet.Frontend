import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";

const routes: Routes = [
  {path: '', component: ProductsListComponent},
  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: 'Product Detail'}},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule { }
