import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ShopComponent} from "./shop.component";

const routes: Routes = [
  {path: '', component: ShopComponent, children: [
      {path: 'products', loadChildren: () => import('../products/products.module').then(mode => mode.ProductsModule), data: {breadcrumb: 'Products'}},
      {path: 'basket', loadChildren: () => import('../basket/basket.module').then(mode => mode.BasketModule), data: {breadcrumb: 'Basket'}}
    ]},
]
@NgModule({
  declarations: [],

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
