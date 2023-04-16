import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() options: string[] = ['option1', 'option2', 'option3'];
  @Output() optionChanged: EventEmitter<string> = new EventEmitter<string>();

  onOptionChanged(eventTarget: Event) {
    this.optionChanged.emit((eventTarget.target as HTMLSelectElement).value);
  }
}
