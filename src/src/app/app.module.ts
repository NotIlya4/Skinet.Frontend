import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./home/home.module";
import {ErrorInterceptor} from "./core/interceptors/error.interceptor";
import {ToastsModule} from "./toasts/toasts.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgbAccordionModule,
    NgbCollapseModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    ToastsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true,}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
