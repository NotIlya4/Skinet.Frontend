import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {IRegisterCredentials} from "../../models/register-credentials";
import {catchError, map, Observable, switchMap, throwError} from "rxjs";
import {IJwtTokenPair} from "../../models/jwt-token-pair";
import {AuthStorage} from "./auth-storage.service";
import {IUserInfo} from "../../models/user-info";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.accountServiceUrl;

  constructor(private client: HttpClient, private storage: AuthStorage) {

  }

  public get jwtTokenPair(): IJwtTokenPair | null {
    return this.storage.read();
  }

  public get userInfo$(): Observable<IUserInfo | null> {
    return this.storage.jwtTokenPair$.pipe(
      switchMap(jwtTokenPair => {
        if (jwtTokenPair !== null) {
          return this.fetchUserInfo();
        }
        return new Observable<null>(subscriber => {subscriber.next(null)});
      })
    );
  }

  public login(registerCredentials: IRegisterCredentials): Observable<IJwtTokenPair> {
    return this.handleResponse(this.client.post<IJwtTokenPair>(`${this.baseUrl}login`, registerCredentials));
  }

  public logout(): void {
    this.client.post(`${this.baseUrl}logout`, this.storage.read()).subscribe();
    this.storage.clearJwtPair()
  }

  public register(registerCredentials: IRegisterCredentials): Observable<IJwtTokenPair> {
    return this.handleResponse(this.client.post<IJwtTokenPair>(`${this.baseUrl}register`, registerCredentials));
  }

  public updateJwtPair(): Observable<IJwtTokenPair> {
    const jwtTokenPair: IJwtTokenPair | null = this.storage.read();
    if (jwtTokenPair === null) {
      return new Observable<IJwtTokenPair>(subscriber =>
      {
        this.storage.clearJwtPair();
        subscriber.error(new Error('User is not logged in'))
      });
    }

    return this.handleResponse(this.client.post<IJwtTokenPair>(`${this.baseUrl}updateJwtPair`, jwtTokenPair));
  }

  private fetchUserInfo(): Observable<IUserInfo> {
    return this.client.get<IUserInfo>(this.baseUrl);
  }

  private handleResponse(observable: Observable<IJwtTokenPair>): Observable<IJwtTokenPair> {
    return observable.pipe(
      map((response) => {
        this.storage.save(response);
        return response;
      }),
      catchError((err) => {
        this.storage.clearJwtPair();
        return throwError(err);
      })
    )
  }
}
