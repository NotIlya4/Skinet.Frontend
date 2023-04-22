import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-primary-outline-button',
  templateUrl: './primary-outline-button.component.html',
  styleUrls: ['./primary-outline-button.component.scss']
})
export class PrimaryOutlineButtonComponent {
  @Output() btnClick = new EventEmitter<MouseEvent>();
  @Input() btnClass: string = '';
  @Input() btnStyle: string = '';

  onClick($event: MouseEvent){
    this.btnClick.emit($event);
  }
}
