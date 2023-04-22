import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../../shared/services/auth/auth.service";
import {IJwtTokenPair} from "../../shared/models/jwt-token-pair";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.setAuthorizationHeader(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
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

  private isResponseIndicatesThatJwtTokenExpired(badResponse: HttpErrorResponse): boolean {
    return badResponse.error.title === 'Jwt token expired'
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
