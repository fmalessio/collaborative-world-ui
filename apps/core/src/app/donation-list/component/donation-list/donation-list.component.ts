import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DonationDetailsComponent } from 'src/app/component/donation-details/donation-details.component';
import { Donation, UPDATED_AT_FOR_STATE } from 'src/app/donation/model/donation';

@UntilDestroy()
@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss'],
})
export class DonationListComponent implements OnInit {

  @Input() donations: Donation[] = [];

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  async showDetailsModal(donation: Donation) {
    const modal = await this.modalController.create({
      component: DonationDetailsComponent,
      componentProps: {
        donation: donation,
        swipeToClose: true,
      }
    });
    return await modal.present();
  }

  getLastUpdate(donation: Donation) {
    return UPDATED_AT_FOR_STATE(donation.transactions, donation.state);
  }

}
