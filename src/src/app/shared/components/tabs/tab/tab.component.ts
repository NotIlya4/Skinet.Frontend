import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PlaceholderSize} from "../../placeholders/text-content-placeholder/placeholder-size";

@Component({
  selector: 'app-tab[tabs]',
  templateUrl: './tab.component.html'
})
export class TabComponent {
  private _tabs!: string[];
  @Input() set tabs(value: string[]){
    if (value){
      this.selectedTab = value[0];
    }
    this._tabs = value;
  };
  get tabs(): string[] {
    return this._tabs
  }
  @Input() disabled: boolean = false;

  selectedTab?: string;

  @Output() tabChange = new EventEmitter<string>();

  onTabChange(filter: string){
    if (this.disabled) {
      return;
    }

    if (filter === this.selectedTab) {
      return;
    }

    this.selectedTab = filter;
    this.tabChange.emit(filter);
  }
}
