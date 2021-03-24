import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
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
  ],
  providers: [
    FileTransfer,
    File
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class XCodeModule { }
