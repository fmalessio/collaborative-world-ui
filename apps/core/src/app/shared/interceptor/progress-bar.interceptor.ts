import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgressBarService } from '../service/progress-bar.service';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor(
    private progressBarService: ProgressBarService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.progressBarService.showProgressBar.next(true);
    return new Observable(observer => {
      const subscription = next.handle(req)
        .subscribe(event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        }, err => {
          this.removeRequest(req);
          observer.error(err);
        }, () => {
          this.removeRequest(req);
          observer.complete();
        });
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }

  /**
   * remove request from queue when cancelled
   */
  private removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.progressBarService.showProgressBar.next(this.requests.length > 0);
  }

}
