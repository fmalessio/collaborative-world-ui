import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { Donation } from 'src/app/donation/model/donation';

@UntilDestroy()
@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss'],
})
export class DonationListComponent implements OnInit {

  private userUuidMock: string = 'f7feadfa-d33a-4ed3-8bf5-b0e090b7381c';
  donations: Donation[] = [];

  constructor(private donationService: DonationService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.donationService.findByUser(this.userUuidMock)
      .pipe(untilDestroyed(this))
      .subscribe(data => this.donations = data);
  }

}
