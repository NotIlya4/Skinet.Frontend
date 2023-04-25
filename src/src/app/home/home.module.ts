import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {CoreModule} from "../core/core.module";



@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        NgbCarouselModule,
        CoreModule
    ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
