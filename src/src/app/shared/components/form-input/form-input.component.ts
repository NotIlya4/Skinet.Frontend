import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent {
  @Input() inputClass: string = '';
  @Input() inputStyle: string = '';
  @Input() inputType: string = 'text';
  @Input() inputPlaceholder: string = 'Placeholder';
  @Input() label: string = 'Label';
  @Input() withLabel: boolean = true;

  _value: string = '';
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input() set value(value: string) {
    this._value = value;
    this.valueChanged.emit(value);
  }
  get value(): string {
    return this._value;
  }
}
