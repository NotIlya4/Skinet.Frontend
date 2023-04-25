import {Component, Input, TemplateRef, ViewChild, ViewRef} from '@angular/core';
import {NgbDropdown} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-dropdown[dropdownMenuItems][dropdownToggle]',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() dropdownMenuItems!: TemplateRef<any>;
  @Input() dropdownToggle!: TemplateRef<any>;
}
