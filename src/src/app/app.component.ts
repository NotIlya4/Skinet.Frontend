import {Component} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {BasketStorage} from "./core/services/basket-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  cardValue: number = 0;

  constructor(private basketService: BasketStorage) {
    basketService.totalQuantity$.subscribe(value => this.cardValue = value);
  }
}
