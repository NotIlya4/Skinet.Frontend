import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {LinkProvider} from "./link-provider.service";

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {
  constructor(private router: Router, private links: LinkProvider) {

  }

  public navigateBasket(): void {
    this.navigate(this.links.basket);
  }

  public navigateProducts(): void {
    this.navigate(this.links.products);
  }

  public navigateProductDetails(id: string): void {
    this.navigate(this.links.productDetail(id));
  }

  public navigateLogin(returnUrl: string | null = null): void {
    this.navigateWithReturnUrl(this.links.login, returnUrl);
  }

  public navigateRegister(returnUrl: string | null = null): void {
    this.navigateWithReturnUrl(this.links.register, returnUrl);
  }

  private navigateWithReturnUrl(url: string, returnUrl: string | null = null): void {
    if (returnUrl !== null) {
      this.router.navigate([url], {queryParams: {returnUrl: returnUrl}})
    } else {
      this.router.navigateByUrl(url);
    }
  }

  public navigate(url: string): void {
    this.router.navigateByUrl(url);
  }
}
