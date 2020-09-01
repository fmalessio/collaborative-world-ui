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

  activeRole: Role;
  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.activeRole = Role.DONOR;
    this.items = menuItems.filter(item => item.roles.includes(this.activeRole));
  }

  roleChange() {
    console.log(this.activeRole);
  }

}
