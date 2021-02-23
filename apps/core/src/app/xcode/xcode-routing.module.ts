import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrCodeModule } from 'ng-qrcode';
import { SharedModule } from '../shared/shared.module';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: ':value',
    component: ViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    QrCodeModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class XCodeRoutingModule { }
