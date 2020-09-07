import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {

  @Input() mode: string = '';

  constructor() { }

  ngOnInit() {
    if (this.isPopover()) {
      console.log('Searching unreaded..');
    } else {
      console.log('Searching all..');
    }
  }

  isPopover(): boolean {
    return this.mode === 'popover';
  }

}
