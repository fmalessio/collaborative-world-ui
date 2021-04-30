import { Component, Input } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
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
    private authService: AuthenticationService,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner
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
    var callback = (): void => {
      this.changeDonationState(
        DONATION_STATE.READY_TO_TRAVEL,
        'Listo para viajar!');
    };
    this.confirmToRun(callback, '¿Seguro que desea marcarla como <strong>listo para viajar</strong>?');
  }

  withCancelCollect(): boolean {
    return this.donation.state === DONATION_STATE.PENDING_TO_COLLECT && this.isTheCollaborator();
  }

  markAsInTravel() {
    if (!this.donation.follow) {
      this.markAsInTravelValidated();
      return;
    }
    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData.text === this.donation.uuid) {
        this.markAsInTravelValidated();
      } else {
        throw new Error("El código QR no coincide con la donación.");
      }
    }).catch(err => {
      console.error(err);
      this.presentToast(err);
    });
  }

  private markAsInTravelValidated() {
    var callback = (): void => {
      this.changeDonationState(
        DONATION_STATE.IN_TRAVEL,
        'Donación recolectada',
        this.authService.getCurrentUserValue().uuid);
    };
    this.confirmToRun(callback, '¿Seguro que desea marcarla como <strong>recolectada</strong>?');
  }

  cancelCollect() {
    var callback = (): void => {
      this.changeDonationState(
        DONATION_STATE.READY_TO_TRAVEL,
        'Recolección cancelada',
        this.authService.getCurrentUserValue().uuid);
    };
    this.confirmToRun(callback, '¿Seguro que desea <strong>cancelar este retiro</strong>?');
  }

  viewInMap() {
    // Android
    window.open(`http://www.google.com/maps/place/${this.donation.geolocation.address}`, '_blank').focus();
  }

  private async confirmToRun(func: Function, msj: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: msj,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            func()
          }
        }
      ]
    });
    await alert.present();
  }

  private isTheDonor(): boolean {
    return this.donation.userId === this.authService.getCurrentUserValue().uuid;
  }

  private isTheCollaborator(): boolean {
    return GET_LAST_TRANSACTION(this.donation.transactions, this.donation.state).collaborator_id ===
      this.authService.getCurrentUserValue().uuid;
  }

  private changeDonationState(newState: DONATION_STATE, callbackMsg: string, collaborator?: string) {
    return this.donationService.changeState(this.donation.uuid, newState, collaborator)
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
