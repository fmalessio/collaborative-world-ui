import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { DonationNearby } from '../../model/donation-nearby';

@UntilDestroy()
@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.scss'],
})
export class NearbyComponent implements OnInit {

  donationsNearby: DonationNearby[] = [];
  private paramsMock: any = {
    lat: "-34.6410901",
    lng: "-58.6695093",
    limit: "50000"
  }

  constructor(private donationService: DonationService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.donationService.findNearby(
      this.paramsMock.lat, this.paramsMock.lng, this.paramsMock.limit)
      .pipe(untilDestroyed(this))
      .subscribe(data => this.donationsNearby = data);
  }

}
