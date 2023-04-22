import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {IBrand} from "../../models/brand";

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private baseUrl: string = environment.productServiceUrl;

  constructor(private httpClient: HttpClient) {
  }

  fetch(){
    return this.httpClient.get<string[]>(`${this.baseUrl}brands`);
  }
}
