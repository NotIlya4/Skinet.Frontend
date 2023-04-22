import {Component, Input} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {LinkProvider} from "../../services/link-provider.service";
import {BasketStorage} from "../../services/basket-storage.service";
import {IUserInfo} from "../../models/user-info";
import {AuthService} from "../../services/auth/auth.service";

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
  userInfo: IUserInfo | null = null;

  constructor(public linkProvider: LinkProvider, private basketService: BasketStorage, private authService: AuthService) {
    basketService.totalQuantity$.subscribe(value => this.cardValue = value);
    authService.userInfo$.subscribe(value => {
      this.userInfo = value;
    })
  }

  logout(): void {
    this.authService.logout();
  }
}
