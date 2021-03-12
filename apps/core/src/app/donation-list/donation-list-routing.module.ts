import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DONATION_STATE } from '../donation/model/donation';
import { MyDonationsComponent } from './component/my-donations/my-donations.component';
import { NearbyComponent } from './component/nearby/nearby.component';

const routes: Routes = [
  {
    path: 'my',
    component: MyDonationsComponent
  },
  {
    path: 'my-pending',
    component: MyDonationsComponent,
    data: { states: [DONATION_STATE.CREATED] }
  },
  {
    path: 'nearby',
    component: NearbyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationListRoutingModule { }
