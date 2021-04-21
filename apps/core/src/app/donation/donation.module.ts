import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BusinessCoreModule } from '../business-core/business-core.module';
import { PlaceAutocompleteComponent } from '../component/place-autocomplete/place-autocomplete.component';
import { SharedModule } from '../shared/shared.module';
import { DonationStepperComponent } from './component/donation-stepper/donation-stepper.component';
import { CategoryListComponent } from './component/donation-stepper/steps/category-list/category-list.component';
import { DescriptionFormComponent } from './component/donation-stepper/steps/description-form/description-form.component';
import { LocationStepComponent } from './component/donation-stepper/steps/location-step/location-step.component';
import { TrackFormComponent } from './component/donation-stepper/steps/track-form/track-form.component';
import { DonationRoutingModule } from './donation-routing.module';
import { CategoryService } from './service/category.service';

@NgModule({
  declarations: [
    // Stepper and Steps
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
    // Stepper and Steps
    CategoryService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DonationModule { }
