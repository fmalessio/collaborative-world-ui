import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { DonationNearby } from 'src/app/donation-list/model/donation-nearby';
import { Donation, DONATION_STATE } from 'src/app/donation/model/donation';
import { environment } from 'src/environments/environment';

const DONATION_ENDPOINT = environment.endpoint + '/donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  getById(id: string): Observable<Donation> {
    return this.http.get<Donation>(`${DONATION_ENDPOINT}/${id}`);
  }

  save(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(DONATION_ENDPOINT, donation);
  }

  findByUser(userUuid: string, states?: DONATION_STATE[]): Observable<Donation[]> {
    let parameters: HttpParams;
    if (states) {
      parameters = new HttpParams();
      parameters = parameters.append('states', states.join());
    }
    return this.http.get<Donation[]>(`${DONATION_ENDPOINT}/user/${userUuid}`, { params: parameters });
  }

  findByCollaborator(collaboratorUuid: string, states?: DONATION_STATE[]): Observable<Donation[]> {
    let parameters: HttpParams;
    if (states) {
      parameters = new HttpParams();
      parameters = parameters.append('states', states.join());
    }
    return this.http.get<Donation[]>(`${DONATION_ENDPOINT}/collaborator/${collaboratorUuid}`, { params: parameters });
  }

  changeState(uuid: string, state: DONATION_STATE, collaborator?: string): Observable<Donation | string> {
    let parameters: HttpParams;
    if (collaborator) {
      parameters = new HttpParams();
      parameters = parameters.append('collaborator', collaborator);
    }
    return this.http.post<Donation | string>(`${DONATION_ENDPOINT}/${uuid}/state/${state}`, null, { params: parameters });
  }

  findNearby(lat: number, lng: number, metersLimit: number): Observable<DonationNearby[]> {
    console.log(`Finding nerby with ${lat}, ${lng}, ${metersLimit}`);
    return this.http.get<DonationNearby[]>(
      `${DONATION_ENDPOINT}/search/nearby`,
      {
        params: {
          lat: lat.toString(),
          lng: lng.toString(),
          limit: metersLimit.toString(),
          user: this.authService.getCurrentUserValue().uuid
        }
      }
    );
  }
}