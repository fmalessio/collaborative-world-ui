import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuardService } from './guard/auth-guard.service';
import { AuthenticationService } from './service/authentication.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AuthenticationService
  ],
  exports: [
    AuthGuardService,
    AuthenticationService
  ]
})
export class AuthModule { }
