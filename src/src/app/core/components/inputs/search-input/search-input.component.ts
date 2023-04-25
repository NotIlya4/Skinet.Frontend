import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  _value: string = '';
  get value() {
    return this._value;
  }
  @Input() set value(value: string) {
    this._value = value;
    this.valueChange.emit(value);
  }
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
}
