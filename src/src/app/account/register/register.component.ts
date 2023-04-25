import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LinkProvider} from "../../core/services/link-provider.service";
import {IJwtTokenPair} from "../../core/models/jwt-token-pair";
import {IBadResponse} from "../../core/models/bad-response";
import {NavigatorService} from "../../core/services/navigator.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', Validators.required);
  form: FormGroup = new FormGroup({
    username: this.username,
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

  onSubmit(): void {
    this.form.disable();
    this.error = null;
    this.authService.register(this.form.value).subscribe({
      next: (value: IJwtTokenPair) => {
        this.navigator.navigate(this.returnUrl);
        this.form.enable();
      },
      error: (error: IBadResponse) => {
        this.error = error.detail;
        this.form.enable();
      }
    });
  }
}
