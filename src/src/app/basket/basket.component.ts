import { Component } from '@angular/core';
import {BasketStorage} from "../core/services/basket-storage.service";
import {IBasketItem, IReadonlyBasketItem} from "../core/models/basket-item";
import {IBasketTotals} from "./order-totals/basket-totals";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  basketItems: IReadonlyBasketItem[]
  basketTotals: IBasketTotals;

  constructor(private basketStorage: BasketStorage) {
    this.basketItems = basketStorage.basketItems;
    basketStorage
      .basketItems$
      .subscribe((value) => this.basketItems = value);
    this.basketTotals = basketStorage.basketTotals;
    basketStorage
      .basketTotals$
      .subscribe(value => this.basketTotals = value);
  }
}
