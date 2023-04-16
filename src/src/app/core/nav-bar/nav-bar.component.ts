import {Component, Input} from '@angular/core';
import {environment} from "../../../environments/environment";
import {LinkProviderService} from "../../shared/services/link-provider.service";
import {BasketService} from "../../shared/services/basket.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isMenuCollapsed = true;
  mobileModThreshold = "md";
  logoPictureUri = `${environment.picturesUrl}logo.png`
  cardValue: number = 0;

  constructor(public linkProvider: LinkProviderService, private basketService: BasketService) {
    basketService.totalQuantity$.subscribe(value => this.cardValue = value);
  }
}
