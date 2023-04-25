import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {IJwtTokenPair} from "../models/jwt-token-pair";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthStorage} from "./auth/auth-storage.service";

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private baseUrl: string = environment.accountServiceUrl;

  constructor(private client: HttpClient, private jwtTokenRepository: AuthStorage) {
  }

  public getJwtTokenPair(): Observable<IJwtTokenPair | null> {
    const tokens: IJwtTokenPair | null = this.jwtTokenRepository.getJwtTokenPair();
    if (tokens === null) {
      return new Observable<null>(subscriber => {subscriber.next(null)});
    } else {
      if (this.isExpired(tokens)){
        return this.updateFromBackend(tokens);
      } else {
        return new Observable<IJwtTokenPair>(subscriber => {subscriber.next(tokens)});
      }
    }
  }

  private updateFromBackend(jwtTokenPair: IJwtTokenPair): Observable<IJwtTokenPair> {
    return this.client.post<IJwtTokenPair>(`${this.baseUrl}updateJwtPair}`, jwtTokenPair)
      .pipe(map(jwtPair => {
        this.jwtTokenRepository.saveJwtTokenPair(jwtTokenPair);
        return jwtPair;
      }));
  }

  private isExpired(jwtTokenPair: IJwtTokenPair): boolean {
    return this.jwtHelper.isTokenExpired(jwtTokenPair.jwtToken);
  }
}
