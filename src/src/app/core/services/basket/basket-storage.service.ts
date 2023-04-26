import { Injectable } from '@angular/core';
import {IBasketItem, IBasketProductItem} from "../../models/basket-item";
import {SimpleLocalStorage} from "../simple-local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class BasketStorage {
  constructor(private storage: SimpleLocalStorage) {

  }

  public save(basketItems: IBasketProductItem[]): void {
    this.storage.set('basket', basketItems);
  }

  public read(): IBasketProductItem[] {
    const basketItems: IBasketProductItem[] | null = this.storage.get('basket');

    if (basketItems === null) {
      this.save([]);
      return [];
    }

    return basketItems;
  }
}
