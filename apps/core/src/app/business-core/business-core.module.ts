import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DonationService } from './service/donation.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    SharedModule
  ],
  providers: [
    DonationService
  ]
})
export class BusinessCoreModule { }
