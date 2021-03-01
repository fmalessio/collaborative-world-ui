import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/shared/service/storage.service';
import { environment } from 'src/environments/environment';
import { AuthDTO, LoginUserDTO } from '../dto/auth.dto';

const AUTH_ENDPOINT = environment.endpoint + '/auth';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private platform: Platform,
    private storageService: StorageService,
    private http: HttpClient
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

  login(loginUser: LoginUserDTO) {
    this.http.post<AuthDTO>(AUTH_ENDPOINT + '/login', loginUser)
      .pipe(untilDestroyed(this)).subscribe(
        authDTO => {
          this.storageService.set('access_token', authDTO.access_token).then(() => {
            this.router.navigate(['folder/Welcome']);
            this.authState.next(true);
          });
        },
        (error) => console.error(JSON.stringify(error))
      );
  }

  logout() {
    this.storageService.remove('access_token').then(() => {
      this.router.navigate(['auth/login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
