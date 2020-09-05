import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './component/header/header.component';
import { MenuComponent } from './component/menu/menu.component';
import { NotificationListComponent } from '../component/notification-list/notification-list.component';
import { NotificationsComponent } from './component/notifications/notifications.component';
import { SelectRolComponent } from './component/select-rol/select-rol.component';

@NgModule({
  declarations: [
    SelectRolComponent,
    MenuComponent,
    HeaderComponent,
    NotificationsComponent,
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    // Components
    MenuComponent,
    HeaderComponent,
    NotificationsComponent
  ]
})
export class SharedModule { }
