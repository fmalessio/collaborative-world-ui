import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { Donation } from 'src/app/donation/model/donation';

@UntilDestroy()
@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.scss'],
})
export class MyDonationsComponent implements OnInit {

  private userUuidMock: string = 'f7feadfa-d33a-4ed3-8bf5-b0e090b7381c';
  donations: Donation[] = [];

  constructor(private donationService: DonationService) { }

  ngOnInit() {
    this.donationService.findByUser(this.userUuidMock)
      .pipe(untilDestroyed(this))
      .subscribe(data => this.donations = data);
  }

}
