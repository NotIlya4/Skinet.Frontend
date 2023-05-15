import { Component } from '@angular/core';
import {faShop} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-shop-icon',
  templateUrl: './shop-icon.component.html',
  styleUrls: ['./shop-icon.component.scss']
})
export class ShopIconComponent {
  icon = faShop;
}
