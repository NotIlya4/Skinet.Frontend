import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Basket} from "../../models/basket";
import {catchError, combineLatest, map, Observable, switchMap, tap, throwError} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {IBasketItem, IBasketProductItem} from "../../models/basket-item";
import {environment} from "../../../../environments/environment";
import {ProductsService} from "../product/products.service";

@Injectable({
  providedIn: 'root'
})
export class BasketBackend {
  private baseUrl: string = environment.basketServiceUrl

  constructor(private client: HttpClient, private productService: ProductsService) {

  }

  public fetch(): Observable<IBasketProductItem[]> {
    const basketItemsWithNulls = this.client.get<IBasketItem[]>(`${this.baseUrl}`).pipe(
      switchMap((items) => {
        if (items.length === 0) {
          return new Observable<IBasketProductItem[]>(subscriber => subscriber.next([]));
        }
        const basketProductItemsWithNulls: Observable<IBasketProductItem | null>[] = items.map(i => this.productService.fetchProduct(i.productId).pipe(
          map(p => {
            return {product: p, quantity: i.quantity}
          }),
          catchError(e => {
            return new Observable<null>(subscriber => subscriber.next(null));
          })));
        return combineLatest(basketProductItemsWithNulls)}));
    return basketItemsWithNulls.pipe(map(items => {
      return items.filter(i => i !== null) as IBasketProductItem[];
    }));
  }

  public insert(basketProductItems: IBasketProductItem[]): void {
    const basketItems: IBasketItem[] = basketProductItems.map(i => {return {productId: i.product.id, quantity: i.quantity}});
    this.client.post(`${this.baseUrl}`, basketItems).subscribe();
  }
}
