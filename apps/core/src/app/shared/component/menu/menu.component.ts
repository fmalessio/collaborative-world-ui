import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { menuItems } from '../../constant/menu-items';
import { MenuItem } from '../../model/menu-item';
import { Role } from '../../model/role';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];
  userAlias: string;
  userFullName: string;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userAlias = this.authService.getCurrentUserValue().alias;
    this.userFullName = this.authService.getCurrentUserValue().fullName;
  }

  updateByRol(activeRole: Role) {
    this.items = menuItems.filter(item => item.roles.includes(activeRole));
  }

}
