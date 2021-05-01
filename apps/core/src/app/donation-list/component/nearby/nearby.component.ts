import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { DisplayMessage, DisplayMessageBuilder } from 'src/app/shared/model/display-message';
import { DonationNearby } from '../../model/donation-nearby';
import { NearbyPreviewComponent } from '../nearby-preview/nearby-preview.component';

@UntilDestroy()
@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.scss'],
})
export class NearbyComponent implements OnInit {

  donationsNearby: DonationNearby[] = [];
  metersLimit: number;
  displayMessage: DisplayMessage;
  messagePage: string;

  constructor(
    private platform: Platform,
    private geolocation: Geolocation,
    private donationService: DonationService,
    public modalController: ModalController
  ) {
    this.metersLimit = 60000;
    this.messagePage = 'Buscando donaciones cercanas, asegúrese de tener el GPS activo...';
    this.displayMessage = DisplayMessageBuilder.buildEmpty();
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.searchByPosition();
    });
  }

  searchByPosition() {
    this.geolocation.getCurrentPosition({ timeout: 8000 }).then((resp) => {
      this.loadNearby(
        resp.coords.latitude,
        resp.coords.longitude
      );
    }).catch((error) => {
      let msg = 'Error obteniendo las coordenadas';
      if (error.message) {
        msg = msg.concat(`. Detalle: ${error.message}`);
      }
      this.displayMessage = DisplayMessageBuilder.buildError(msg);
    });
  }

  async showDetailsModal(donation: DonationNearby) {
    const modal = await this.modalController.create({
      component: NearbyPreviewComponent,
      componentProps: {
        donationNearby: donation,
        swipeToClose: true,
      }
    });
    return await modal.present();
  }

  private loadNearby(lat: number, lng: number): void {
    this.donationService.findNearby(lat, lng, this.metersLimit)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        data.length === 0 ?
          this.messagePage = 'No se han encontrado donaciones cercanas en un radio de 60 KM.' :
          this.messagePage = '';
        this.donationsNearby = data;
      });
  }

}
