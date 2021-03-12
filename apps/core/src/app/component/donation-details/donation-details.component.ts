import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { Donation, DONATION_STATE } from 'src/app/donation/model/donation';
import { DonationStatePipe } from 'src/app/shared/pipe/donation-state.pipe';

@UntilDestroy()
@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrls: ['./donation-details.component.scss'],
})
export class DonationDetailsComponent implements OnInit {

  @Input() donation: Donation;
  @Input() withStatus: boolean = true;

  resume: Array<{ label: string, value: string }>;

  constructor(
    public modalCtrl: ModalController,
    private donationStatePipe: DonationStatePipe,
    private donationService: DonationService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.resume = [];
    this.resume.push({ label: 'Categoría', value: this.donation.box.category.name });
    this.resume.push({ label: 'Cantidad', value: this.donation.amount.toString() });
    this.resume.push({ label: 'Descripción', value: this.donation.box.description });
    this.resume.push({ label: 'Con seguimiento', value: this.donation.follow ? 'Sí' : 'No' });
    if (this.withStatus) {
      this.resume.push({
        label: 'Estado',
        value: this.donationStatePipe.transform(this.donation.state)
      });
    }
    this.resume.push({ label: 'Dirección', value: this.donation.geolocation.address });
  }

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
