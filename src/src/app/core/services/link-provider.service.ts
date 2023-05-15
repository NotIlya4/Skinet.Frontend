import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkProvider {
  get basket(): string {
    return '/shop/basket';
  }

  get products(): string {
    return '/shop/products';
  }

  get login(): string {
    return '/account/login';
  }

  get register(): string {
    return '/account/register';
  }
}
