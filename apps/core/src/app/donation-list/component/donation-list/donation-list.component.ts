import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DonationViewComponent } from 'src/app/component/donation-view/donation-view.component';
import { Donation, DONATION_STATE, UPDATED_AT_FOR_STATE } from 'src/app/donation/model/donation';
import { DisplayMessage, DisplayMessageBuilder } from 'src/app/shared/model/display-message';

@UntilDestroy()
@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss'],
})
export class DonationListComponent implements OnInit {

  displayMessage: DisplayMessage;
  @Input() donations: Donation[] = [];
  @Output() onDonationStateChange = new EventEmitter<{ uuid: string, state: DONATION_STATE }>();

  constructor(public modalController: ModalController) {
    this.displayMessage = DisplayMessageBuilder.buildEmpty();
  }

  ngOnInit() { }

  async showDetailsModal(donation: Donation) {
    this.displayMessage = DisplayMessageBuilder.buildEmpty();

    const modal = await this.modalController.create({
      component: DonationViewComponent,
      componentProps: {
        donation: donation,
        swipeToClose: true,
      }
    });
    modal.onDidDismiss().then((dismiss: any) => {
      if (dismiss && dismiss.data) {
        const event = dismiss.data.event;
        if (event === 'STATE_CHANGED') {
          this.onDonationStateChange.emit({
            uuid: dismiss.data.uuid,
            state: dismiss.data.state
          });
        } else if (event === 'ERROR') {
          this.displayMessage = DisplayMessageBuilder.buildError(dismiss.data.message);
        }
      }
    });
    return await modal.present();
  }

  getLastUpdate(donation: Donation) {
    return UPDATED_AT_FOR_STATE(donation.transactions, donation.state);
  }

}
