import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { menuItems } from '../../constant/menu-items';
import { MenuItem } from '../../model/menu-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  unread = 12;

  currentMenuItem: MenuItem;
  private currentUrl: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
        this.currentMenuItem = menuItems.find((item: MenuItem) => item.url === this.currentUrl);
      }
    });
  }

}
