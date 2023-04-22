import {Directive, HostListener, Input} from '@angular/core';
import {BasketStorage} from "../services/basket-storage.service";
import {IProduct} from "../models/product";

@Directive({
  selector: '[appIncreaseProductsInBasket][product]'
})
export class IncreaseProductsInBasketDirective {
  @Input() product!: IProduct;
  @Input() quantity: number = 1;

  constructor(private basketService: BasketStorage) {
  }

  @HostListener('click')
  onClick() {
    this.basketService.increaseProduct(this.product, this.quantity);
  }
}
