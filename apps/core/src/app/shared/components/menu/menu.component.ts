import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { Role } from '../../model/role';
import { menuItems } from './menu-items';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() { }

  ngOnInit() {
  }

  updateByRol(activeRole: Role) {
    this.items = menuItems.filter(item => item.roles.includes(activeRole));
  }

}
