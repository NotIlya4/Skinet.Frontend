import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ValidatorsProvider} from "../../../services/validators-provider.service";

@Component({
  selector: 'app-login-form-email-input[formControl]',
  templateUrl: './login-form-email-input.component.html',
  styleUrls: ['./login-form-email-input.component.scss']
})
export class LoginFormEmailInputComponent implements OnInit {
  @Input() formControl!: FormControl;

  constructor(private validators: ValidatorsProvider) {
  }

  ngOnInit(): void {
    this.formControl.addValidators(this.validators.isEmailCorrect);
  }

  logStatus(): void {
    console.log(this.formControl.status);
  }
}
