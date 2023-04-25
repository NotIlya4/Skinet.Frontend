import {Directive, HostListener, Input} from '@angular/core';
import {BasketStorage} from "../services/basket-storage.service";
import {IProduct} from "../models/product";

@Directive({
  selector: '[appDecreaseProductsInBasket][product]'
})
export class DecreaseProductsInBasketDirective {
  @Input() product!: IProduct;
  @Input() quantity: number = 1;

  constructor(private basketService: BasketStorage) {
  }

  @HostListener('click')
  onClick() {
    this.basketService.decreaseProduct(this.product, this.quantity);
  }
}
