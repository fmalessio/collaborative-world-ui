import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthInterceptor } from '../auth/interceptor/auth.interceptor';
import { DonationDetailsComponent } from '../component/donation-details/donation-details.component';
import { NotificationListComponent } from '../component/notification-list/notification-list.component';
import { HeaderComponent } from './component/header/header.component';
import { MenuComponent } from './component/menu/menu.component';
import { NotificationsComponent } from './component/notifications/notifications.component';
import { SelectRolComponent } from './component/select-rol/select-rol.component';
import { DonationStatePipe } from './pipe/donation-state.pipe';
import { StorageService } from './service/storage.service';

@NgModule({
  declarations: [
    SelectRolComponent,
    MenuComponent,
    HeaderComponent,
    NotificationsComponent,
    NotificationListComponent,
    DonationDetailsComponent,
    // Providers
    DonationStatePipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
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
    // Providers
    DonationStatePipe
  ],
  providers: [
    DonationStatePipe,
    StorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
