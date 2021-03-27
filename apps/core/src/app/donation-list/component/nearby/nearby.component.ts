import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { DonationNearby } from '../../model/donation-nearby';

@UntilDestroy()
@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.scss'],
})
export class NearbyComponent implements OnInit {

  donationsNearby: DonationNearby[] = [];
  radioLimit: number;
  messages: string[];

  constructor(
    private platform: Platform,
    private geolocation: Geolocation,
    private donationService: DonationService
  ) {
    this.radioLimit = 50000;
    this.messages = ["Buscando donaciones cercanas, asegúrese de tener el GPS activo"];
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.searchByPosition();
    });
  }

  searchByPosition() {
    this.geolocation.getCurrentPosition({ timeout: 8000 }).then((resp) => {
      this.messages = [];
      this.loadNearby(
        resp.coords.latitude,
        resp.coords.longitude
      );
    }).catch((error) => {
      this.messages.push('Error obteniendo las coodenadas');
      if (error.message) {
        this.messages.push(`Detalle: ${error.message}`);
      }
    });
  }

  private loadNearby(lat: number, lng: number): void {
    this.donationService.findNearby(lat, lng, this.radioLimit)
      .pipe(untilDestroyed(this))
      .subscribe(data => this.donationsNearby = data);
  }

}
