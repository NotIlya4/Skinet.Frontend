import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, delay, Observable, switchMap, throwError} from 'rxjs';
import {IBadResponse} from "../models/bad-response";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      delay(0),
      catchError((err: HttpErrorResponse) => {
        const badResponse: IBadResponse = {title: err.error.title, detail: err.error.detail};
        return throwError(() => badResponse);
      })
    );
  }
}
