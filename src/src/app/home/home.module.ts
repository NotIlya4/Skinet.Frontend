import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        NgbCarouselModule,
        CoreModule,
        SharedModule
    ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
