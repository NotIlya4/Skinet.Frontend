import {EventEmitter, Injectable} from '@angular/core';
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

  private _registerHappen = new EventEmitter<IJwtTokenPair>();
  public get registerHappen(): Observable<IJwtTokenPair> {
    return this._registerHappen;
  }
  private _loginHappen = new EventEmitter<IJwtTokenPair>();
  public get loginHappen(): Observable<IJwtTokenPair> {
    return this._loginHappen;
  }

  public login(registerCredentials: IRegisterCredentials): Observable<IJwtTokenPair> {
    return this.client.post<IJwtTokenPair>(`${this.baseUrl}login`, registerCredentials).pipe(
      this.pipeSaveJwtPair(),
      tap(jwtPair => {
        this._loginHappen.emit(jwtPair);
      })
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
      tap(jwtTokenPair => {
        this._registerHappen.emit(jwtTokenPair);
      })
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
      this.pipeClearJwtPairOnError()
    );
  }

  public isEmailBusy(email: string): Observable<boolean> {
    return this.client.get<boolean>(`${this.baseUrl}email/${email}/busy`);
  }

  public isUsernameBusy(username: string): Observable<boolean> {
    return this.client.get<boolean>(`${this.baseUrl}username/${username}/busy`);
  }

  private fetchUserInfo(): Observable<IUserInfo> {
    return this.client.get<IUserInfo>(this.baseUrl);
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
}
