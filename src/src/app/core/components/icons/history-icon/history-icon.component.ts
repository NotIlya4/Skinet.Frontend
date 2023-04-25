import { Component } from '@angular/core';
import {faCircleMinus, faHistory} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-history-icon',
  templateUrl: './history-icon.component.html',
  styleUrls: ['./history-icon.component.scss']
})
export class HistoryIconComponent {
  icon: IconDefinition = faHistory;
  protected readonly faCircleMinus = faCircleMinus;
}
