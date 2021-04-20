import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { GeolocationMockService } from 'mocks/geolocation-mock.service';
import { BusinessCoreModule } from '../business-core/business-core.module';
import { DonationService } from '../business-core/service/donation.service';
import { EmptyPageComponent } from '../component/empty-page/empty-page.component';
import { SharedModule } from '../shared/shared.module';
import { DonationListComponent } from './component/donation-list/donation-list.component';
import { MyDonationsComponent } from './component/my-donations/my-donations.component';
import { NearbyPreviewComponent } from './component/nearby-preview/nearby-preview.component';
import { NearbyComponent } from './component/nearby/nearby.component';
import { PendingToCollectComponent } from './component/pending-to-collect/pending-to-collect.component';
import { DonationListRoutingModule } from './donation-list-routing.module';

@NgModule({
  declarations: [
    DonationListComponent,
    MyDonationsComponent,
    NearbyComponent,
    NearbyPreviewComponent,
    PendingToCollectComponent,
    EmptyPageComponent
  ],
  imports: [
    BusinessCoreModule,
    CommonModule,
    DonationListRoutingModule,
    SharedModule
  ],
  providers: [
    Platform,
    //Geolocation,
    { provide: Geolocation, useClass: GeolocationMockService },
    DonationService
  ]
})
export class DonationListModule { }
