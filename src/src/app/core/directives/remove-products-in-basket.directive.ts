import {Directive, HostListener, Input} from '@angular/core';
import {IProduct} from "../models/product";
import {BasketStorage} from "../services/basket/basket-storage.service";
import {BasketService} from "../services/basket/basket.service";

@Directive({
  selector: '[appRemoveProductsInBasket][product]'
})
export class RemoveProductsInBasketDirective {
  @Input() product!: IProduct;

  constructor(private basketService: BasketService) {
  }

  @HostListener('click')
  onClick() {
    this.basketService.deleteProduct(this.product);
  }
}
