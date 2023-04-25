import { Component } from '@angular/core';
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-loader-icon',
  templateUrl: './loader-icon.component.html',
  styleUrls: ['./loader-icon.component.scss']
})
export class LoaderIconComponent {
  icon = faSpinner;
}
