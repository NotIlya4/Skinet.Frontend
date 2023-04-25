import {Component, OnInit} from '@angular/core';
import {IRegisterCredentials} from "../../core/models/register-credentials";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LinkProvider} from "../../core/services/link-provider.service";
import {IJwtTokenPair} from "../../core/models/jwt-token-pair";
import {IBadResponse} from "../../core/models/bad-response";
import {NavigatorService} from "../../core/services/navigator.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', Validators.required);
  form: FormGroup = new FormGroup({
    email: this.email,
    password: this.password
  });
  error: string | null = null;
  returnUrl: string = this.links.products;

  constructor(private authService: AuthService, private router: Router, private links: LinkProvider,
              private navigator: NavigatorService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams['returnUrl']) {
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
    }
  }

  onSignInPressed(): void {
    this.error = null;
    this.form.disable();
    this.authService.login(this.form.value).subscribe({
      next: (value: IJwtTokenPair) => {
        this.form.enable();
        this.navigator.navigate(this.returnUrl);
      },
      error: (error: IBadResponse) => {
        this.form.enable();
        this.error = error.detail;
      }
    });
  }
}
