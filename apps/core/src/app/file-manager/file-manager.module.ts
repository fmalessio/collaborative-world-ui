import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileManagerService } from './service/file-manager.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FileTransfer,
    File,
    FileManagerService
  ]
})
export class FileManagerModule { }
