import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared/shared.module";
import { ProductDetailsComponent } from './product-details/product-details.component';
import {ProductsRoutingModule} from "./products-routing.module";
import {BreadcrumbModule} from "xng-breadcrumb";
import {ProductCardComponent} from "./product-card/product-card.component";
import {ProductCardsContainerComponent} from "./product-cards-container/product-cards-container.component";
import {ProductCardSkeletonComponent} from "./product-card-skeleton/product-card-skeleton.component";
import {ToastsModule} from "../toasts/toasts.module";
import {CoreModule} from "../core/core.module";



@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    ProductCardComponent,
    ProductCardsContainerComponent,
    ProductCardSkeletonComponent
  ],
  exports: [

  ],
  imports: [
      CommonModule,
      FontAwesomeModule,
      SharedModule,
      ProductsRoutingModule,
      BreadcrumbModule,
      ToastsModule,
      CoreModule
  ]
})
export class ProductsModule { }