import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import {ShopRoutingModule} from "./shop-routing.module";
import {CoreModule} from "../core/core.module";



@NgModule({
  declarations: [
    ShopComponent
  ],
    imports: [
        CommonModule,
        ShopRoutingModule,
        CoreModule
    ]
})
export class ShopModule { }
