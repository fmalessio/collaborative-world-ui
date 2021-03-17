import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { Donation, DONATION_STATE } from 'src/app/donation/model/donation';

@UntilDestroy()
@Component({
  selector: 'app-donation-view',
  templateUrl: './donation-view.component.html',
  styleUrls: ['./donation-view.component.scss'],
})
export class DonationViewComponent {

  @Input() donation: Donation;

  constructor(
    public modalCtrl: ModalController,
    private donationService: DonationService,
    private toastController: ToastController
  ) { }

  close() {
    if (this.modalCtrl) {
      this.modalCtrl.dismiss();
    }
  }

  withQR() {
    return this.donation.follow;
  }

  withMarkAsReadyToTravel() {
    return this.donation.follow && this.donation.state === DONATION_STATE.CREATED;
  }

  markAsReadyToTravel() {
    return this.donationService.changeState(this.donation.uuid, DONATION_STATE.READY_TO_TRAVEL)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.presentToast('Listo para viajar!');
          this.modalCtrl.dismiss({
            event: 'STATE_CHANGED',
            uuid: this.donation.uuid,
            state: DONATION_STATE.READY_TO_TRAVEL
          });
        },
        (error) => this.presentToast(error)
      );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
