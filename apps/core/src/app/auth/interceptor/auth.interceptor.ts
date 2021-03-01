import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/service/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.storageService.get('access_token'))
      .pipe(switchMap(token => {
          if (token) {
            const headers = {
              'Authorization': `Bearer ${token}`,
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
