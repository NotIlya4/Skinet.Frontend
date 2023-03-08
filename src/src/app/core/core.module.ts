import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {RouterLink} from "@angular/router";
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    RouterLink,
    NgbCollapse,
    FontAwesomeModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }
