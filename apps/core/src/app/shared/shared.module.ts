import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptor } from '../auth/interceptor/auth.interceptor';
import { DonationDetailsComponent } from '../component/donation-details/donation-details.component';
import { DonationViewComponent } from '../component/donation-view/donation-view.component';
import { NotificationListComponent } from '../component/notification-list/notification-list.component';
import { HeaderComponent } from './component/header/header.component';
import { MenuComponent } from './component/menu/menu.component';
import { NotificationsComponent } from './component/notifications/notifications.component';
import { SelectRolComponent } from './component/select-rol/select-rol.component';
import { ProgressBarInterceptor } from './interceptor/progress-bar.interceptor';
import { DonationStatePipe } from './pipe/donation-state.pipe';
import { ProgressBarService } from './service/progress-bar.service';
import { StorageService } from './service/storage.service';

@NgModule({
  declarations: [
    SelectRolComponent,
    MenuComponent,
    HeaderComponent,
    NotificationsComponent,
    NotificationListComponent,
    DonationDetailsComponent,
    DonationViewComponent,
    // Providers
    DonationStatePipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicStorageModule.forRoot()
  ],
  exports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // Components
    MenuComponent,
    HeaderComponent,
    NotificationsComponent,
    DonationDetailsComponent,
    DonationViewComponent,
    // Providers
    DonationStatePipe,
    ProgressBarService
  ],
  providers: [
    DonationStatePipe,
    StorageService,
    ProgressBarService,
    { provide: HTTP_INTERCEPTORS, useClass: ProgressBarInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
