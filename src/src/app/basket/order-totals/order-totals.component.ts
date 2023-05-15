import {Component, Input} from '@angular/core';
import {BasketStorage} from "../../core/services/basket/basket-storage.service";
import {Observable} from "rxjs";
import {IBasketTotals} from "./basket-totals";
import {LinkProvider} from "../../core/services/link-provider.service";
import {BasketService} from "../../core/services/basket/basket.service";

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent {
  basketTotals: IBasketTotals = {subtotal: 0, shipping: 0, total: 0};

  constructor(public links: LinkProvider, private basketService: BasketService) {
    basketService
      .basketTotals$
      .subscribe(value => this.basketTotals = value);
  }
}
