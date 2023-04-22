import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FormInputComponent
    }
  ]
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() inputClass: string = '';
  @Input() inputStyle: string = '';
  @Input() inputType: string = 'text';
  @Input() inputPlaceholder: string = 'Placeholder';
  @Input() label: string = 'Label';
  @Input() withLabel: boolean = true;

  private _value: string = '';
  get value(): string {
    return this._value;
  }
  @Input() set value(value: string) {
    this._value = value;
    this.valueChange.emit(value);
  }
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  private touched: boolean = false;
  private disabled: boolean = false;

  registerOnChange(onChange: any) {
    this.valueChange.subscribe(value => {
      onChange(value);
    })
  }

  registerOnTouched(onTouched: any) {
    this.valueChange.subscribe(value => {
      onTouched();
      this.touched = true;
    })
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }
}
