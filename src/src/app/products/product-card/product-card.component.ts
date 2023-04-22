import {Component, Input} from '@angular/core';
import {IProduct} from "../../shared/models/product";
import {LinkProvider} from "../../shared/services/link-provider.service";
import {BasketStorage} from "../../shared/services/basket-storage.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  @Input() disabled: boolean = false;

  constructor(public linkProvider: LinkProvider, private basketService: BasketStorage) {
  }

  public increaseProduct(product: IProduct): void {
    this.basketService.increaseProduct(product);
  }
}
