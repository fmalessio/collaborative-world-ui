import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { BusinessCoreModule } from '../business-core/business-core.module';
import { DonationService } from '../business-core/service/donation.service';
import { MessagePageComponent } from '../component/message-page/message-page.component';
import { SharedModule } from '../shared/shared.module';
import { DonationListComponent } from './component/donation-list/donation-list.component';
import { MyDonationsComponent } from './component/my-donations/my-donations.component';
import { NearbyPreviewComponent } from './component/nearby-preview/nearby-preview.component';
import { NearbyComponent } from './component/nearby/nearby.component';
import { SearchByCollaboratorComponent } from './component/search-by-collaborator/search-by-collaborator.component';
import { DonationListRoutingModule } from './donation-list-routing.module';

@NgModule({
  declarations: [
    DonationListComponent,
    MyDonationsComponent,
    NearbyComponent,
    NearbyPreviewComponent,
    SearchByCollaboratorComponent,
    MessagePageComponent
  ],
  imports: [
    BusinessCoreModule,
    CommonModule,
    DonationListRoutingModule,
    SharedModule
  ],
  providers: [
    Platform,
    Geolocation,
    //{ provide: Geolocation, useClass: GeolocationMockService },
    BarcodeScanner,
    //{ provide: BarcodeScanner, useClass: BarcodeScannerMockService },
    DonationService
  ]
})
export class DonationListModule { }
