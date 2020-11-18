import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationListComponent } from './component/donation-list/donation-list.component';
import { NearbyComponent } from './component/nearby/nearby.component';

const routes: Routes = [
  {
    path: '',
    component: DonationListComponent
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
