import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BusinessCoreModule } from '../business-core/business-core.module';
import { SharedModule } from '../shared/shared.module';
import { DonationListComponent } from './component/donation-list/donation-list.component';
import { NearbyComponent } from './component/nearby/nearby.component';
import { DonationListRoutingModule } from './donation-list-routing.module';

@NgModule({
  declarations: [
    DonationListComponent,
    NearbyComponent
  ],
  imports: [
    BusinessCoreModule,
    CommonModule,
    DonationListRoutingModule,
    SharedModule
  ]
})
export class DonationListModule { }
