import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Donation, UPDATED_AT_FOR_STATE } from 'src/app/donation/model/donation';

@UntilDestroy()
@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss'],
})
export class DonationListComponent implements OnInit {

  @Input('donations') donations: Donation[] = [];

  ngOnInit() { }

  private getLastUpdate(donation: Donation) {
    return UPDATED_AT_FOR_STATE(donation.transactions, donation.state);
  }

}
