import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProgressBarService } from '../service/progress-bar.service';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {

  constructor(
    private progressBarService: ProgressBarService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBarService.setShow(true);
    return next.handle(req).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.endProgressBar();
      }
      return event;
    }), catchError((error: HttpErrorResponse) => {
      this.endProgressBar();
      return throwError(error);
    }));
  }

  async endProgressBar() {
    setTimeout(
      () => this.progressBarService.setShow(false),
      1000
    );
  }

}
