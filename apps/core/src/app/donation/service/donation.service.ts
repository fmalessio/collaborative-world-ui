import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donation } from '../model/donation';

const DONATION_ENDPOINT = environment.endpoint + '/donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient) { }

  save(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(DONATION_ENDPOINT, donation);
  }
}
