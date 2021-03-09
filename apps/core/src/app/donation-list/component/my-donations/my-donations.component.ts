import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { Donation } from 'src/app/donation/model/donation';

@UntilDestroy()
@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.scss'],
})
export class MyDonationsComponent implements OnInit {

  donations: Donation[] = [];

  constructor(
    private authService: AuthenticationService,
    private donationService: DonationService
  ) { }

  ngOnInit() {
    this.donationService.findByUser(this.authService.getCurrentUserValue().uuid)
      .pipe(untilDestroyed(this))
      .subscribe(data => this.donations = data);
  }

}
