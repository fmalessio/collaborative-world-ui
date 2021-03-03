import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  canActivate() {
    return this.authenticationService.isAuthenticated();
  }
}
