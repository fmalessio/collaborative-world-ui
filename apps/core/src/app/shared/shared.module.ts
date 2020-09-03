import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { SelectRolComponent } from './components/select-rol/select-rol.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    SelectRolComponent,
    MenuComponent,
    HeaderComponent
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
    HeaderComponent
  ]
})
export class SharedModule { }
