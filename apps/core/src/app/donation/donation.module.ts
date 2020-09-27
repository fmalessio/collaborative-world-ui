import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { DonationStepperComponent } from './component/donation-stepper/donation-stepper.component';
import { DonationRoutingModule } from './donation-routing.module';
import { CategoryService } from './service/category.service';

@NgModule({
  declarations: [
    DonationStepperComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DonationRoutingModule,
    HttpClientModule
  ],
  providers: [
    CategoryService
  ]
})
export class DonationModule { }
