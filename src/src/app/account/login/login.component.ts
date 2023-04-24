import {Component, OnInit} from '@angular/core';
import {IRegisterCredentials} from "../../shared/models/register-credentials";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {LinkProvider} from "../../shared/services/link-provider.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', Validators.required)
  form: FormGroup = new FormGroup({
    email: this.email,
    password: this.password
  });

  constructor(private authService: AuthService, private router: Router, private links: LinkProvider) {

  }

  onSignInPressed(): void {
    this.authService.login(this.form.value).subscribe(value => {
      this.router.navigateByUrl(this.links.products);
    });
  }

  ngOnInit(): void {

  }
}
