import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import {LinkProvider} from "../services/link-provider.service";
import {NavigatorService} from "../services/navigator.service";


export const authGuard: CanActivateFn = (next, state) => {
  const authService: AuthService = inject(AuthService);
  const links: LinkProvider = inject(LinkProvider);
  const router: Router = inject(Router);
  const navigator: NavigatorService = inject(NavigatorService);

  return authService.isLoggedIn$.pipe(
    tap(isLoggedIn => {
      if (!isLoggedIn) {
        navigator.navigateLogin(state.url);
      }
    })
  )
}
