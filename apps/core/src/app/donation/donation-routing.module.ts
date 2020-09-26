import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DonationStepperComponent } from './component/donation-stepper/donation-stepper.component';

const routes: Routes = [
  {
    path: 'donate',
    component: DonationStepperComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class DonationRoutingModule { }
