import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ValidatorsProvider} from "../../../services/validators-provider.service";

@Component({
  selector: 'app-register-form-username-input[formControl]',
  templateUrl: './register-form-username-input.component.html',
  styleUrls: ['./register-form-username-input.component.scss']
})
export class RegisterFormUsernameInputComponent implements OnInit {
  @Input() formControl!: FormControl;

  constructor(private validators: ValidatorsProvider) {
  }

  ngOnInit(): void {
    this.formControl.addAsyncValidators(this.validators.isUsernameBusy);
    this.formControl.addValidators(this.validators.isOnlyLettersAndDigits);
  }
}
