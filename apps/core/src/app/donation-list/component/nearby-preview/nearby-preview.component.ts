import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { Donation } from 'src/app/donation/model/donation';
import { DonationNearby } from '../../model/donation-nearby';

@Component({
  selector: 'app-nearby-preview',
  templateUrl: './nearby-preview.component.html',
  styleUrls: ['./nearby-preview.component.scss'],
})
export class NearbyPreviewComponent implements OnInit {

  @Input() donationNearby: DonationNearby;
  donation: Donation;

  constructor(
    public modalCtrl: ModalController,
    private alertController: AlertController,
    private donationService: DonationService
  ) { }

  ngOnInit() {
    this.donationService.getById(this.donationNearby.uuid).subscribe(donation =>
      this.donation = donation
    );
  }

  close() {
    if (this.modalCtrl) {
      this.modalCtrl.dismiss();
    }
  }

  async pickUpDonationConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: 'Esta indicando que irá a retirar esta donación, la misma cambiará de estado a <strong>pendiente de retiro</strong>.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            this.pickUpDonation();
            // TODO: redirect to pendings
          }
        }
      ]
    });

    await alert.present();
  }

  private pickUpDonation() {
    // Android
    window.open(`http://www.google.com/maps/place/${this.donation.geolocation.address}`, '_blank').focus();
  }

}
