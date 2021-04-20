import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { Donation, DONATION_STATE, GET_LAST_TRANSACTION } from 'src/app/donation/model/donation';

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
    private toastController: ToastController,
    private authServicer: AuthenticationService
  ) { }

  close() {
    if (this.modalCtrl) {
      this.modalCtrl.dismiss();
    }
  }

  withQR(): boolean {
    return this.donation.follow && this.isTheDonor();
  }

  withMarkAsReadyToTravel(): boolean {
    return this.donation.follow &&
      this.donation.state === DONATION_STATE.CREATED &&
      this.isTheDonor();
  }

  markAsReadyToTravel() {
    this.changeDonationState(DONATION_STATE.READY_TO_TRAVEL, 'Listo para viajar!');
  }

  withCancelCollect(): boolean {
    return this.donation.state === DONATION_STATE.PENDING_TO_COLLECT && this.isTheCollaborator();
  }

  cancelCollect() {
    this.changeDonationState(DONATION_STATE.READY_TO_TRAVEL, 'Recolección cancelada');
  }

  private isTheDonor(): boolean {
    return this.donation.userId === this.authServicer.getCurrentUserValue().uuid;
  }

  private isTheCollaborator(): boolean {
    return GET_LAST_TRANSACTION(this.donation.transactions, this.donation.state).collaborator_id ===
      this.authServicer.getCurrentUserValue().uuid;
  }

  private changeDonationState(newState: DONATION_STATE, callbackMsg: string) {
    return this.donationService.changeState(this.donation.uuid, newState)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.presentToast(callbackMsg);
          this.modalCtrl.dismiss({
            event: 'STATE_CHANGED',
            uuid: this.donation.uuid,
            state: newState
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
