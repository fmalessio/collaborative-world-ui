import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/shared/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private platform: Platform,
    private storageService: StorageService
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storageService.get('access_token').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login() {
    var dummy_response = {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZtYWxlc3NpbyIsImlhdCI6MTYxNDUyNzM2MSwiZXhwIjoxNjE0NzAwMTYxfQ._0Heb2VgbI98WhWoY3f5LQCa6yA2ljcTKhkge0wtEWw"
    };
    this.storageService.set('access_token', dummy_response).then((response) => {
      this.router.navigate(['folder/Welcome']);
      this.authState.next(true);
    });
  }

  logout() {
    this.storageService.remove('access_token').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
