import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-card[imageRef][bodyRef]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() imageRef!: TemplateRef<any>;
  @Input() bodyRef!: TemplateRef<any>;
  @Input() disabled: boolean = false;
}
