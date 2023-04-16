import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IBrand} from "../models/brand";

@Injectable({
  providedIn: 'root'
})
export class ProductTypesService {
  private baseUrl: string = environment.productServiceUrl;

  constructor(private httpClient: HttpClient) {
  }

  get(){
    return this.httpClient.get<string[]>(`${this.baseUrl}product-types`);
  }
}
