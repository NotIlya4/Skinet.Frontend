import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {
  @Input() btnClass: string = '';
  @Input() btnStyle: string = '';
  @Input() type: string = '';
  @Input() disabled: boolean = false;
  @Input() outline: boolean = false;
}
