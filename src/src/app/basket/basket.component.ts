import { Component } from '@angular/core';
import {BasketStorage} from "../core/services/basket/basket-storage.service";
import {IBasketItem, IBasketProductItem} from "../core/models/basket-item";
import {IBasketTotals} from "./order-totals/basket-totals";
import {BasketService} from "../core/services/basket/basket.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  basketProductItems: IBasketProductItem[] = [];
  basketTotals: IBasketTotals = {subtotal: 0, total: 0, shipping: 0};

  constructor(private basketService: BasketService) {
    basketService
      .basketItems$
      .subscribe((value) => this.basketProductItems = value);
  }
}
