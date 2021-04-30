import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FolderPageRoutingModule } from './folder-routing.module';
import { FolderPage } from './folder.page';

@NgModule({
  imports: [
    FolderPageRoutingModule,
    SharedModule
  ],
  declarations: [FolderPage]
})
export class FolderPageModule { }
