import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {
  @Output() btnClick = new EventEmitter<MouseEvent>();
  @Input() btnClass: string = '';
  @Input() btnStyle: string = '';

  onClick($event: MouseEvent){
    this.btnClick.emit($event);
  }
}
