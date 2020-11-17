import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BusinessCoreModule } from '../business-core/business-core.module';
import { DonationListComponent } from './component/donation-list/donation-list.component';
import { DonationListRoutingModule } from './donation-list-routing.module';

@NgModule({
  declarations: [
    DonationListComponent
  ],
  imports: [
    BusinessCoreModule,
    CommonModule,
    DonationListRoutingModule
  ]
})
export class DonationListModule { }
