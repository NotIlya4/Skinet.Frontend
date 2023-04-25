import {Component, EventEmitter, Input, OnInit, Output, Self, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ValidatorsProvider} from "../../../services/validators-provider.service";

@Component({
  selector: 'app-register-form-email-input[formControl]',
  templateUrl: './register-form-email-input.component.html',
  styleUrls: ['./register-form-email-input.component.scss']
})
export class RegisterFormEmailInputComponent implements OnInit {
  @Input() formControl!: FormControl;

  constructor(private validators: ValidatorsProvider) {
  }

  ngOnInit(): void {
    this.formControl.addValidators(this.validators.isEmailCorrect);
    this.formControl.addAsyncValidators(this.validators.isEmailBusy);
  }
}
