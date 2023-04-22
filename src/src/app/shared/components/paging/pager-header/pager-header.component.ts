import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pager-header[currentPage][pageSize][objectsCount]',
  templateUrl: './pager-header.component.html',
  styleUrls: ['./pager-header.component.scss']
})
export class PagerHeaderComponent {
  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Input() objectsCount!: number;

  getFirstDisplayingNumber(): number {
    if (!this.isInited()){
      return 0;
    }

    return (this.currentPage - 1) * this.pageSize + 1;
  }

  getLastDisplayingNumber(): number {
    if (!this.isInited()){
      return 0;
    }

    return Math.min(this.currentPage * this.pageSize, this.objectsCount!);
  }

  isInited(): boolean {
    return this.objectsCount !== undefined;
  }
}
