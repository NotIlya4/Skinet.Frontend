import {Component, EventEmitter, Host, Input, OnInit, Optional, Output, Self} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder: string = 'Placeholder';
  @Input() label: string = 'Label';
  @Input() withLabel: boolean = true;
  @Input() disableValidIndicator: boolean = false;
  @Input() showSpinner: boolean = false;

  _value: string = '';
  _disabled: boolean = false;
  _touched: boolean = false;

  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
    this.valueChange.emit(value);
  }
  valueChange: EventEmitter<string> = new EventEmitter<string>();
  get touched() {
    return this._touched;
  }
  @Input() set touched(touched: boolean) {
    this._touched = touched
    this.touchedChange.emit(touched);
  }
  @Output() touchedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  get disabled() {
    return this._disabled;
  }
  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.disabledChange.emit(disabled);
  }
  @Output() disabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(@Self() public control: NgControl) {
    control.valueAccessor = this;
  }

  showInvalid(): boolean {
    return this.touched && this.isFormInvalid();
  }

  showValid(): boolean {
    return !this.disableValidIndicator && this.touched && this.isFormValid();
  }

  isFormValid(): boolean {
    return this.control.valid ?? false;
  }

  isFormInvalid(): boolean {
    return this.control.invalid ?? false;
  }

  checkIfFlagContain(flag: string): boolean {
    if (this.control.errors) {
      return this.control.errors[flag] === true;
    }
    return false;
  }

  isMinLength(): number | null {
    if (this.control.errors) {
      const min: number | undefined = this.control.errors['minlength']['requiredLength'];
      return min === undefined ? null : min;
    }
    return null;
  }

  registerOnChange(onChange: any) {
    this.valueChange.subscribe(value => {
      onChange(value);
    })
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  onTouched() {}

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }
}
