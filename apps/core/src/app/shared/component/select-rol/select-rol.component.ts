import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Role } from '../../model/role';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-rol',
  templateUrl: './select-rol.component.html',
  styleUrls: ['./select-rol.component.scss'],
})
export class SelectRolComponent implements OnInit {

  activeRole: Role;
  userRoles: Role[] = [];
  roleForm: FormGroup;
  @Output() onRolChange: EventEmitter<Role> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.roleForm = new FormGroup({
      role: new FormControl()
    });
    this.activeRole = Role.DONOR;
    this.roleForm.get('role').setValue(this.activeRole);
    this.userRoles.push(Role.DONOR, Role.COLLABORATOR);
    this.roleChange();
  }

  roleChange() {
    this.onRolChange.emit(this.roleForm.get('role').value);
  }

  hasMultipleRoles(): boolean {
    return this.userRoles.length > 1;
  }

}
