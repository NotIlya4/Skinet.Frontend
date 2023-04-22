import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-collection-container[elementRef][elementContexts]',
  templateUrl: './collection-container.component.html',
  styleUrls: ['./collection-container.component.scss']
})
export class CollectionContainerComponent {
  @Input() elementRef!: TemplateRef<any>;
  @Input() elementContexts!: any[];
}
