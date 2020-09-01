import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    FormsModule,
    IonicModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ]
})
export class SharedModule { }
