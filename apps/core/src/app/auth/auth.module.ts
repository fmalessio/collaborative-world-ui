import { CommonModule } from '@angular/common';
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
