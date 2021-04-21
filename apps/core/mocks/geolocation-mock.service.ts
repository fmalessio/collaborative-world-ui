import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationMockService {

  constructor() { }

  getCurrentPosition(options?: any): Promise<Geoposition> {
    return new Promise<Geoposition>((resolve, reject) => {
      const position: Geoposition = {
        coords: {
          latitude: -34.63284719532406,
          longitude: -58.6296368183098
        },
        timestamp: new Date().getTime()
      };
      setTimeout(() => {
        resolve(position);
      }, 1500);
    });
  }
}

export interface Geoposition {
  coords: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}
