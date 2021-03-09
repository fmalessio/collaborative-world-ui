import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/service/storage.service';
import { LoggedUser, LOGGED_USER_STORAGE } from '../dto/auth.dto';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.storageService.get(LOGGED_USER_STORAGE))
      .pipe(switchMap((loggedUser: LoggedUser) => {
          if (loggedUser) {
            const headers = {
              'Authorization': `Bearer ${loggedUser.access_token}`,
            };
            if (request.responseType === 'json') {
              headers['Content-Type'] = 'application/json';
            }
            request = request.clone({
              setHeaders: headers
            });
          }
          return next.handle(request);
        })
      );
  }
}
