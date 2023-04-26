import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Input() disabled: boolean = false;

  value: string = '';
  @Output() searchClicked: EventEmitter<string> = new EventEmitter<string>();

  onSearchClicked(event: any): void {
    this.searchClicked.emit(this.value);
  }

  log(): void {
    console.log('Yaya')
  }
}
