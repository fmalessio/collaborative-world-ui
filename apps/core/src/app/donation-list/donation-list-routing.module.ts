import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDonationsComponent } from './component/my-donations/my-donations.component';
import { NearbyComponent } from './component/nearby/nearby.component';

const routes: Routes = [
  {
    path: 'my',
    component: MyDonationsComponent
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
