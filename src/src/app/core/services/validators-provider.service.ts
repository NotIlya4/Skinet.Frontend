import { Injectable } from '@angular/core';
import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {AuthService} from "./auth/auth.service";
import {map, switchMap, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValidatorsProvider {
  constructor(private authService: AuthService) { }

  public get isEmailBusy(): AsyncValidatorFn {
    return c => {
      return timer(500).pipe(
        switchMap(() => {
          return this.authService.isEmailBusy(c.value).pipe(
            map(isBusy => isBusy ? {emailBusy: true} : null)
          );
        })
      )
    }
  }

  public get isUsernameBusy(): AsyncValidatorFn {
    return c => {
      return timer(500).pipe(
        switchMap(() => {
          return this.authService.isUsernameBusy(c.value).pipe(
            map(isBusy => isBusy ? {usernameBusy: true} : null)
          );
        })
      )
    };
  }

  public get isEmailCorrect(): ValidatorFn {
    const regex: RegExp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]');
    return c => {
      if (!regex.test(c.value)) {
        return {email: true};
      }
      return null;
    }
  }

  public get isPasswordStrengthEnough(): ValidatorFn {
    return c => {
      return null;
    }
  }

  public get isOnlyLettersAndDigits(): ValidatorFn {
    const regex: RegExp = new RegExp("^[a-zA-Z0-9]+$");
    return c => {
      if (!regex.test(c.value)) {
        return {notOnlyLettersAndDigits: true};
      }
      return null;
    }
  }
}
