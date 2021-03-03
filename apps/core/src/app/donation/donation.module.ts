import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BusinessCoreModule } from '../business-core/business-core.module';
import { PlaceAutocompleteComponent } from '../component/place-autocomplete/place-autocomplete.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { DescriptionFormComponent } from './component/description-form/description-form.component';
import { DonationStepperComponent } from './component/donation-stepper/donation-stepper.component';
import { LocationStepComponent } from './component/location-step/location-step.component';
import { TrackFormComponent } from './component/track-form/track-form.component';
import { DonationRoutingModule } from './donation-routing.module';
import { CategoryService } from './service/category.service';

@NgModule({
  declarations: [
    DonationStepperComponent,
    CategoryListComponent,
    DescriptionFormComponent,
    TrackFormComponent,
    PlaceAutocompleteComponent,
    LocationStepComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BusinessCoreModule,
    DonationRoutingModule,
    HttpClientModule
  ],
  providers: [
    CategoryService
  ]
})
export class DonationModule { }
