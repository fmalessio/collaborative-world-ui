import { NgModule } from '@angular/core';
import { QrCodeModule } from 'ng-qrcode';
import { SharedModule } from '../shared/shared.module';
import { ViewComponent } from './view/view.component';
import { XCodeRoutingModule } from './xcode-routing.module';

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    XCodeRoutingModule,
    SharedModule,
    QrCodeModule
  ]
})
export class XCodeModule { }
