import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  onSubmit(): void {

  }
}
