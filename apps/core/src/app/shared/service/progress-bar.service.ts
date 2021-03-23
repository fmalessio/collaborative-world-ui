import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  showProgressBar = new BehaviorSubject(false);

  constructor() { }

  setShow(show: boolean) {
    this.showProgressBar.next(show);
  }

  getShowProgressBar(): Observable<boolean> {
    return this.showProgressBar.asObservable();
  }

  getShowProgressBarValue(): boolean {
    return this.showProgressBar.value;
  }

}
