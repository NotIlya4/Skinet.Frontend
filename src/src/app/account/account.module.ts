import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AccountRoutingModule} from "./account-routing.module";
import {CoreModule} from "../core/core.module";
import {EmailValidator, NG_VALIDATORS, ReactiveFormsModule} from "@angular/forms";
import { AccountRouterPageComponent } from './account-router-page/account-router-page.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    AccountRouterPageComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
