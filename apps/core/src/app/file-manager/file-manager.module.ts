import { NgModule } from '@angular/core';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { SharedModule } from '../shared/shared.module';
import { FileManagerService } from './service/file-manager.service';

@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ],
  providers: [
    DocumentViewer,
    FileTransfer,
    File,
    FileManagerService
  ]
})
export class FileManagerModule { }
