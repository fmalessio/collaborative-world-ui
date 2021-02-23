import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Donation } from 'src/app/donation/model/donation';
import { DonationStatePipe } from 'src/app/shared/pipe/donation-state.pipe';

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
    private donationStatePipe: DonationStatePipe,
    public modalCtrl: ModalController
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

}
