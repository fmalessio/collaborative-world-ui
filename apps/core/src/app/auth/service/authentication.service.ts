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
    this.http.post<AuthDTO>(AUTH_ENDPOINT + '/login', loginUser)
      .pipe(untilDestroyed(this)).subscribe(
        authDTO => {
          this.storageService.set('access_token', authDTO.access_token).then(() => {
            this.authState.next(true);
            this.router.navigate(['folder/Welcome']);
          });
        },
        (error) => console.error(JSON.stringify(error))
      );
  }

  logout() {
    this.storageService.remove('access_token').then(() => {
      this.authState.next(false);
      this.router.navigate(['auth/login']);
    });
  }

  private ifLoggedIn(): Promise<boolean> {
    return this.storageService.get('access_token').then((response) => {
      if (response) {
        this.authState.next(true);
        return true;
      }
      return false;
    });
  }

  getAuthState() {
    return this.authState.asObservable();
  }

  isAuthenticated(): boolean {
    return this.authState.value;
  }
}
