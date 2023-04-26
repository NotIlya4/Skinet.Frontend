import {IProduct} from "./product";

export interface IBasketItem {
  productId: string
  quantity: number
}

export interface IBasketProductItem {
  product: IProduct,
  quantity: number
}
