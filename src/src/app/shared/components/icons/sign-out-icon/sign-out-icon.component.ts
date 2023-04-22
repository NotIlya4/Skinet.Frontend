import { Component } from '@angular/core';
import {faCircleMinus, faSignOut} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sign-out-icon',
  templateUrl: './sign-out-icon.component.html',
  styleUrls: ['./sign-out-icon.component.scss']
})
export class SignOutIconComponent {
  icon = faSignOut;
}
