import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DONATION_STATE } from '../donation/model/donation';
import { MyDonationsComponent } from './component/my-donations/my-donations.component';
import { NearbyComponent } from './component/nearby/nearby.component';
import { PendingToCollectComponent } from './component/pending-to-collect/pending-to-collect.component';

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
    path: 'pending-to-collect',
    component: PendingToCollectComponent,
    data: { states: [DONATION_STATE.PENDING_TO_COLLECT] }
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
