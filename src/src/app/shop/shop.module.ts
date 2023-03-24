import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared/shared.module";
import { ProductDetailsComponent } from './product-details/product-details.component';
import {ShopRoutingModule} from "./shop-routing.module";
import {BreadcrumbModule} from "xng-breadcrumb";



@NgModule({
  declarations: [
      ShopComponent,
      ProductItemComponent,
      ProductDetailsComponent
  ],
  exports: [

  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    ShopRoutingModule,
    BreadcrumbModule
  ]
})
export class ShopModule { }
