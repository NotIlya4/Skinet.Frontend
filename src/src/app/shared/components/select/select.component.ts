import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() options: string[] = ['option1', 'option2', 'option3'];
  @Input() disabled: boolean = false;
  @Output() optionChanged: EventEmitter<string> = new EventEmitter<string>();

  onOptionChanged(eventTarget: Event) {
    if (this.disabled) {
      return;
    }

    this.optionChanged.emit((eventTarget.target as HTMLSelectElement).value);
  }
}
