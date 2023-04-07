import {Directive, HostListener, Input} from '@angular/core';
import {BasketService} from "../services/basket.service";
import {IProduct} from "../models/product";

@Directive({
  selector: '[appIncreaseProductsInBasket]'
})
export class IncreaseProductsInBasketDirective {
  @Input() product!: IProduct;
  @Input() quantity: number = 1;

  constructor(private basketService: BasketService) {
  }

  @HostListener('click')
  onClick() {
    this.basketService.increaseProduct(this.product, this.quantity);
  }
}
