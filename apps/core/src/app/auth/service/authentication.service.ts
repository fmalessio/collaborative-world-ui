import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/shared/service/storage.service';
import { environment } from 'src/environments/environment';
import { LoggedUser, LOGGED_USER_STORAGE, LoginUserDTO } from '../dto/auth.dto';

const AUTH_ENDPOINT = environment.endpoint + '/auth';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  currentUser = new BehaviorSubject<LoggedUser>(undefined);

  constructor(
    private platform: Platform,
    private storageService: StorageService,
    private http: HttpClient,
    private router: Router
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  login(loginUser: LoginUserDTO) {
    this.http.post<LoggedUser>(AUTH_ENDPOINT + '/login', loginUser)
      .pipe(untilDestroyed(this)).subscribe(
        (loggedUser: LoggedUser) => {
          this.storageService.set(LOGGED_USER_STORAGE, loggedUser).then(() => {
            this.authState.next(true);
            this.currentUser.next(loggedUser);
            this.goLoggedin();
          });
        },
        (error) => console.error(JSON.stringify(error))
      );
  }

  logout() {
    this.storageService.remove(LOGGED_USER_STORAGE).then(() => {
      this.authState.next(false);
      this.currentUser.next(undefined);
      this.goLoggedout();
    });
  }

  getAuthState() {
    return this.authState.asObservable();
  }

  isAuthenticated(): boolean {
    return this.authState.value;
  }

  getCurrentUserValue() {
    return this.currentUser.value;
  }

  private ifLoggedIn() {
    return this.storageService.get(LOGGED_USER_STORAGE).then((response) => {
      if (response) {
        this.http.get<boolean>(AUTH_ENDPOINT + '/alive')
          .pipe(untilDestroyed(this)).subscribe((isAlive) => {
            this.authState.next(isAlive);
            isAlive ? this.goLoggedin() : this.goLoggedout();
          });
      } else {
        this.goLoggedout();
      }
    });
  }

  private goLoggedout() {
    this.router.navigate(['auth/login']);
  }

  private goLoggedin() {
    this.router.navigate(['folder/Welcome']);
  }

}
