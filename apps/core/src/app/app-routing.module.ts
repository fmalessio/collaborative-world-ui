import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationListComponent } from './component/notification-list/notification-list.component';

const routes: Routes = [
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'donation',
    loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule)
  },
  {
    path: 'notification-list',
    component: NotificationListComponent
  },
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
