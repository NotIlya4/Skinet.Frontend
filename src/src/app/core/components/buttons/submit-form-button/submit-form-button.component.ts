import {Component, Input} from '@angular/core';
import {AbstractControl, FormControlStatus} from "@angular/forms";

@Component({
  selector: 'app-submit-form-button[status]',
  templateUrl: './submit-form-button.component.html',
  styleUrls: ['./submit-form-button.component.scss']
})
export class SubmitFormButtonComponent {
  @Input() status!: FormControlStatus;

  get isDisabled() {
    return this.status != 'VALID';
  }
}
