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

  public navigateProductDetals(id: string): void {
    this.navigate(this.links.productDetail(id));
  }

  private navigate(url: string): void {
    this.router.navigateByUrl(url);
  }
}
