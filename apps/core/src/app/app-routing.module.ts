import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/guard/auth-guard.service';
import { NotificationListComponent } from './component/notification-list/notification-list.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'folder/:id',
        loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
      },
      {
        path: 'notification-list',
        component: NotificationListComponent
      },
      {
        path: 'donation',
        loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule)
      },
      {
        path: 'donation-list',
        loadChildren: () => import('./donation-list/donation-list.module').then(m => m.DonationListModule)
      },
      {
        path: 'xcode',
        loadChildren: () => import('./xcode/xcode.module').then(m => m.XCodeModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
