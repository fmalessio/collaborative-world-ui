import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const action: Observable<string> = this.route.params.pipe(map(p => p.action));
    action.subscribe(actionValue => {
      if (action && actionValue === 'logout') {
        this.logout();
      } else if (action && actionValue === 'login') {
        this.login();
      }
    });
  }

  login() {
    // TODO
    this.authenticationService.login({ username: 'fmalessio', password: '1234' });
  }

  logout() {
    this.authenticationService.logout();
  }

}
