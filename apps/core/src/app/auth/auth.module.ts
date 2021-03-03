import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './component/login/login.component';
import { SigninComponent } from './component/signin/signin.component';

@NgModule({
  declarations: [
    LoginComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class AuthModule { }
