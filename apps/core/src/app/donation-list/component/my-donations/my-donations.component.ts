import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { Donation, DONATION_STATE } from 'src/app/donation/model/donation';

@UntilDestroy()
@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.scss'],
})
export class MyDonationsComponent implements OnInit {

  donations: Donation[] = [];
  private states: DONATION_STATE[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private donationService: DonationService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.pipe(untilDestroyed(this))
      .subscribe(routeData => {
        this.states = routeData.states;
        this.donationService.findByUser(this.authService.getCurrentUserValue().uuid, this.states)
          .pipe(untilDestroyed(this))
          .subscribe(data => this.donations = data);
      });
  }

  donationStateChange(data: { uuid: string, state: DONATION_STATE }) {
    let donation = this.donations.find(don => don.uuid === data.uuid);
    donation.transactions.push({ uuid: '', state: data.state, generationDate: new Date() });
    donation.state = data.state;
  }

}
