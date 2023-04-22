import {Directive, HostListener, Input} from '@angular/core';
import {IProduct} from "../models/product";
import {BasketStorage} from "../services/basket-storage.service";

@Directive({
  selector: '[appRemoveProductsInBasket][product]'
})
export class RemoveProductsInBasketDirective {
  @Input() product!: IProduct;

  constructor(private basketService: BasketStorage) {
  }

  @HostListener('click')
  onClick() {
    this.basketService.deleteProduct(this.product);
  }
}
