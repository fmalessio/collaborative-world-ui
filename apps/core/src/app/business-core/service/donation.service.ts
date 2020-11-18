import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DonationNearby } from 'src/app/donation-list/model/donation-nearby';
import { Donation } from 'src/app/donation/model/donation';
import { environment } from 'src/environments/environment';

const DONATION_ENDPOINT = environment.endpoint + '/donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient) { }

  save(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(DONATION_ENDPOINT, donation);
  }

  findByUser(userUuid: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${DONATION_ENDPOINT}/user/${userUuid}`);
  }

  findNearby(lat: string, lng: string, limit: string): Observable<DonationNearby[]> {
    console.log(`Finding nerby with ${lat}, ${lng}, ${limit}`);
    return this.http.get<DonationNearby[]>(
      `${DONATION_ENDPOINT}/search/nearby`,
      { params: { lat: lat, lng: lng, limit: limit } }
    );
  }
}
