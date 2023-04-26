import {Component, Input} from '@angular/core';
import {IProduct} from "../../core/models/product";
import {LinkProvider} from "../../core/services/link-provider.service";
import {BasketStorage} from "../../core/services/basket/basket-storage.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  @Input() disabled: boolean = false;

  constructor(public linkProvider: LinkProvider) {
  }
}
