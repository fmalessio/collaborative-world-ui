import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NotificationListComponent } from '../../../component/notification-list/notification-list.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  @Input() unread: number;
  private notificationsPopover;

  constructor(public popoverController: PopoverController) { }

  ngOnInit() { }

  async presentNotifications(ev: any) {
    this.notificationsPopover = await this.popoverController.create({
      component: NotificationListComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await this.notificationsPopover.present();
  }

  dismissPopover() {
    if (this.notificationsPopover) {
      this.notificationsPopover.dismiss().then(() => {
        this.notificationsPopover = null;
      });
    }
  }

}
