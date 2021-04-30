import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { Donation, DONATION_STATE } from 'src/app/donation/model/donation';

@UntilDestroy()
@Component({
  selector: 'app-pending-to-collect',
  templateUrl: './pending-to-collect.component.html',
  styleUrls: ['./pending-to-collect.component.scss'],
})
export class PendingToCollectComponent implements OnInit {

  donations: Donation[] = [];
  messagePage: string;
  private states: DONATION_STATE[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private donationService: DonationService
  ) {
    this.messagePage = 'Buscando donaciones...';
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(untilDestroyed(this))
      .subscribe(routeData => {
        this.states = routeData.states;
        this.donationService.findByCollaborator(this.authService.getCurrentUserValue().uuid, this.states)
          .pipe(untilDestroyed(this))
          .subscribe(data => {
            this.donations = data;
            this.donations.length === 0 ?
              this.messagePage = 'Nada por aquí!' : this.messagePage = '';
          });
      });
  }

  donationStateChange(data: { uuid: string, state: DONATION_STATE }) {
    this.donations = this.donations.filter(don => don.uuid !== data.uuid);
  }

}
