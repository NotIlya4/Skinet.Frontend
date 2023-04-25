import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CoreModule} from "../core/core.module";
import { ProductDetailsComponent } from './product-details/product-details.component';
import {ProductsRoutingModule} from "./products-routing.module";
import {BreadcrumbModule} from "xng-breadcrumb";
import {ProductCardComponent} from "./product-card/product-card.component";
import {ToastsModule} from "../toasts/toasts.module";



@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    ProductCardComponent
  ],
  exports: [

  ],
  imports: [
      CommonModule,
      FontAwesomeModule,
      CoreModule,
      ProductsRoutingModule,
      BreadcrumbModule,
      ToastsModule
  ]
})
export class ProductsModule { }
