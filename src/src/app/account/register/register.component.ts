import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {LinkProvider} from "../../shared/services/link-provider.service";
import {IJwtTokenPair} from "../../shared/models/jwt-token-pair";
import {IBadResponse} from "../../shared/models/bad-response";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', Validators.required);
  form: FormGroup = new FormGroup({
    username: this.username,
    email: this.email,
    password: this.password
  });
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router, private links: LinkProvider) {

  }

  onSubmit(): void {
    this.authService.register(this.form.value).subscribe({
      next: (value: IJwtTokenPair) => {
        this.router.navigateByUrl(this.links.products);
      },
      error: (error: IBadResponse) => {
        this.error = error.detail;
      }
    });
  }
}
