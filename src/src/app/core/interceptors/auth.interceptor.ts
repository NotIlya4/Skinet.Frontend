import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import {IJwtTokenPair} from "../models/jwt-token-pair";
import {IBadResponse} from "../models/bad-response";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.setAuthorizationHeader(request);

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (this.isResponseIndicatesThatJwtTokenExpired(error)) {
          return this.handleExpiredJwtToken(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handleExpiredJwtToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.updateJwtPair().pipe(
      switchMap(_ => {
        request = this.setAuthorizationHeader(request);
        return next.handle(request);
      })
    )
  }

  private isResponseIndicatesThatJwtTokenExpired(badResponse: IBadResponse | HttpErrorResponse): boolean {
    const parsedBadResponse: IBadResponse = badResponse as IBadResponse;
    if (parsedBadResponse) {
      return parsedBadResponse.title === 'Jwt token expired';
    }

    const httpBadResponse: HttpErrorResponse = badResponse as HttpErrorResponse;
    if (httpBadResponse) {
      return httpBadResponse.error.title === 'Jwt token expired';
    }

    return false;
  }

  private setAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
    const jwtTokenPair: IJwtTokenPair | null = this.authService.jwtTokenPair;
    if (jwtTokenPair !== null) {
      return request.clone({
        headers: request.headers.set('Authorization', `Bearer ${jwtTokenPair.jwtToken}`)
      });
    }
    return request;
  }
}
