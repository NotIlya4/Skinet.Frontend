import { Component } from '@angular/core';
import {IRegisterCredentials} from "../../shared/models/register-credentials";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {LinkProvider} from "../../shared/services/link-provider.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router, private links: LinkProvider) {

  }

  onSignInPressed(): void {
    this.authService.login(this.loginForm.value).subscribe(value => {
      this.router.navigateByUrl(this.links.products);
    });
  }
}
