import {Component, Input} from '@angular/core';
import {IReadonlyBasketItem} from "../../shared/models/basket-item";
import {LinkProvider} from "../../shared/services/link-provider.service";


@Component({
  selector: 'app-basket-items-table[basketItems]',
  templateUrl: './basket-items-table.component.html',
  styleUrls: ['./basket-items-table.component.scss']
})
export class BasketItemsTableComponent {
  @Input() basketItems!: IReadonlyBasketItem[];

  constructor(public linkProvider: LinkProvider) { }
}
