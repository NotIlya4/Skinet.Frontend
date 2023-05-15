import { Injectable } from '@angular/core';
import {IProduct} from "../../models/product";
import {BasketStorage} from "./basket-storage.service";
import {BasketBackend} from "./basket-backend.service";
import {IBasketItem, IBasketProductItem} from "../../models/basket-item";
import {BehaviorSubject, catchError, combineLatest, map, Observable, switchMap, tap} from "rxjs";
import {IBasketTotals} from "../../../basket/order-totals/basket-totals";
import {AuthService} from "../auth/auth.service";
import {Basket} from "../../models/basket";
import {ProductsService} from "../product/products.service";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketItemsSource: BehaviorSubject<Basket> = new BehaviorSubject<Basket>(new Basket(this.storage.read()));

  constructor(private storage: BasketStorage, private backend: BasketBackend, private authService: AuthService, private productService: ProductsService) {
    this.loadFromBackend();

    authService.registerHappen.subscribe(_ => {
      this.saveToBackend();
    })

    authService.loginHappen.subscribe(_ => {
      this.loadFromBackend();
    })
  }

  public get totalQuantity$(): Observable<number> {
    return this.basketItems$.pipe(map(b => {
      return b.map(i => i.quantity).reduce((acc, cur) => acc + cur, 0);
    }));
  }

  public get basketTotals$(): Observable<IBasketTotals> {
    return this.basketItems$.pipe(
      map(items => {
        const subtotal: number = items.map(i => i.product.price * i.quantity).reduce((acc, cur) => acc + cur, 0);
        const shipping: number = 10;
        const total: number = subtotal + shipping;
        return {subtotal, shipping, total};
      })
    );
  }

  public get basketItems$(): Observable<IBasketProductItem[]> {
    return this.basketItemsSource.asObservable().pipe(map(b => b.items));
  }

  public increaseProduct(product: IProduct, amountToIncrease: number = 1): void {
    this.basketItemsSource.value.increaseProduct(product, amountToIncrease);
    this.updateAndSave();
  }

  public decreaseProduct(product: IProduct, amountToDecrease: number = 1): void {
    this.basketItemsSource.value.decreaseProduct(product, amountToDecrease);
    this.updateAndSave();
  }

  public deleteProduct(product: IProduct): void {
    this.basketItemsSource.value.deleteProduct(product);
    this.updateAndSave();
  }

  private update(): void {
    this.basketItemsSource.next(this.basketItemsSource.value);
  }

  private saveToLocal(): void {
    this.storage.save(this.basketItemsSource.value.items);
  }

  private saveToBackend(): void {
    this.backend.insert(this.basketItemsSource.value.items);
  }

  private loadFromBackend(): void {
    this.backend.fetch().subscribe(basket => {
      this.storage.save(basket);
      this.basketItemsSource.next(new Basket(basket));
    })
  }

  private updateAndSave(): void {
    this.update();
    this.saveToLocal();
    if (this.authService.isUserLogin) {
      this.saveToBackend();
    }
  }
}
