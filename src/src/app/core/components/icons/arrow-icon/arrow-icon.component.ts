import { Component } from '@angular/core';
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-arrow-icon',
  templateUrl: './arrow-icon.component.html',
  styleUrls: ['./arrow-icon.component.scss']
})
export class ArrowIconComponent {
  icon = faArrowRight;
}
