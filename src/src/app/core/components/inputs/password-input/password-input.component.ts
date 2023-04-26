import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ValidatorsProvider} from "../../../services/validators-provider.service";

@Component({
  selector: 'app-password-input[formControl]',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {
  @Input() formControl!: FormControl;

  constructor(private validators: ValidatorsProvider) {
  }

  ngOnInit(): void {
    this.formControl.addValidators(this.validators.isPasswordStrengthEnough);
  }
}
