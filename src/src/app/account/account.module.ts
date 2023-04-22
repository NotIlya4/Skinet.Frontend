import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AccountRoutingModule} from "./account-routing.module";
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
