import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mode => mode.ShopModule), data: {breadcrumb: {skip: true}}},
  {path: 'account', loadChildren: () => import('./account/account.module').then(mode => mode.AccountModule), data: {breadcrumb: {skip: true}}},
  {path: '**', redirectTo: 'shop/products', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
