import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkProviderService {
  get basket(): string {
    return '/shop/basket';
  }

  productDetail(productId: string): string {
    return `/shop/products/${productId}`;
  }

  get home(): string {
    return '/';
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
