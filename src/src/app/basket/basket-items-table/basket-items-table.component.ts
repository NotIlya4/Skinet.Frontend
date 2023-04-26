import {Component, Input} from '@angular/core';
import {IBasketItem, IBasketProductItem} from "../../core/models/basket-item";
import {LinkProvider} from "../../core/services/link-provider.service";


@Component({
  selector: 'app-basket-items-table[basketProductItems]',
  templateUrl: './basket-items-table.component.html',
  styleUrls: ['./basket-items-table.component.scss']
})
export class BasketItemsTableComponent {
  @Input() basketProductItems!: IBasketProductItem[];

  constructor(public linkProvider: LinkProvider) { }
}
