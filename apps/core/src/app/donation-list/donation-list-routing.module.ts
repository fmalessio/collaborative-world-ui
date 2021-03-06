import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DONATION_STATE } from '../donation/model/donation';
import { MyDonationsComponent } from './component/my-donations/my-donations.component';
import { NearbyComponent } from './component/nearby/nearby.component';
import { SearchByCollaboratorComponent } from './component/search-by-collaborator/search-by-collaborator.component';

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
    path: 'collaborator/pending-to-collect',
    component: SearchByCollaboratorComponent,
    data: { states: [DONATION_STATE.PENDING_TO_COLLECT] }
  },
  {
    path: 'collaborator/collected',
    component: SearchByCollaboratorComponent,
    data: { states: [DONATION_STATE.IN_TRAVEL] }
  },
  {
    path: 'collaborator/finalized',
    component: SearchByCollaboratorComponent,
    data: { states: [DONATION_STATE.FINALIZED] }
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
