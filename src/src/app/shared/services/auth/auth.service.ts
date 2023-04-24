import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {IRegisterCredentials} from "../../models/register-credentials";
import {catchError, map, tap, Observable, switchMap, throwError} from "rxjs";
import {IJwtTokenPair} from "../../models/jwt-token-pair";
import {AuthStorage} from "./auth-storage.service";
import {IUserInfo} from "../../models/user-info";
import {IBadResponse} from "../../models/bad-response";

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
    return this.client.post<IJwtTokenPair>(`${this.baseUrl}login`, registerCredentials).pipe(
      this.pipeSaveJwtPair(),
      this.pipeMapError()
    );
  }

  public logout(): void {
    const request = this.storage.read();
    this.client.post(`${this.baseUrl}logout`, request).subscribe();
    this.storage.clearJwtPair();
  }

  public register(registerCredentials: IRegisterCredentials): Observable<IJwtTokenPair> {
    return this.client.post<IJwtTokenPair>(`${this.baseUrl}register`, registerCredentials).pipe(
      this.pipeSaveJwtPair(),
      this.pipeMapError()
    );
  }

  public updateJwtPair(): Observable<IJwtTokenPair> {
    const jwtTokenPair: IJwtTokenPair | null = this.storage.read();
    if (jwtTokenPair === null) {
      this.storage.clearJwtPair();
      return new Observable<IJwtTokenPair>(subscriber =>
      {
        subscriber.error(new Error('User is not logged in'))
      });
    }

    return this.client.post<IJwtTokenPair>(`${this.baseUrl}updateJwtPair`, jwtTokenPair).pipe(
      this.pipeSaveJwtPair(),
      this.pipeMapError(),
      this.pipeClearJwtPairOnError()
    );
  }

  public isEmailBusy(email: string): Observable<boolean> {
    return this.client.get<boolean>(`${this.baseUrl}email/${email}/busy`).pipe(
      this.pipeMapError()
    );
  }

  public isUsernameBusy(username: string): Observable<boolean> {
    return this.client.get<boolean>(`${this.baseUrl}username/${username}/busy`).pipe(
      this.pipeMapError()
    );
  }

  private fetchUserInfo(): Observable<IUserInfo> {
    return this.client.get<IUserInfo>(this.baseUrl).pipe(
      this.pipeMapError()
    );
  }

  private pipeSaveJwtPair() {
    return tap<IJwtTokenPair>(value => {
      this.storage.save(value);
    })
  }

  private pipeClearJwtPairOnError() {
    return tap<IJwtTokenPair>({
      error: err =>  {
        this.storage.clearJwtPair();
        return throwError(() => err);
      }
    })
  }

  private pipeMapError<T>() {
    return catchError<T, Observable<never>>((err: HttpErrorResponse) => {
      const badResponse: IBadResponse = {title: err.error.title, detail: err.error.detail};
      return throwError(() => badResponse);
    })
  }

  private handleResponse(observable: Observable<IJwtTokenPair>): Observable<IJwtTokenPair> {
    return observable.pipe(
      this.pipeSaveJwtPair(),
      this.pipeMapError()
    )
  }
}
