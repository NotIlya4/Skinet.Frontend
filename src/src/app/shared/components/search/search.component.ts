import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  value: string = '';
  @Output() searchClicked: EventEmitter<string> = new EventEmitter<string>();

  onSearchClicked(event: any): void {
    this.searchClicked.emit(this.value);
  }
}
