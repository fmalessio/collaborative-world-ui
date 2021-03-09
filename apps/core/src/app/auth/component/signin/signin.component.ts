import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoginUserDTO } from '../../dto/auth.dto';
import { AuthenticationService } from '../../service/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  signinFormGroup: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  save() {
    if (!this.signinFormGroup.valid) {
      // this.errorMessage = 'ERROR MSG';
      return;
    }
    const data = this.signinFormGroup.getRawValue();
    const userLogin: LoginUserDTO = { username: data.email, password: data.password };
    this.authenticationService.login(userLogin);
  }

  private createForm() {
    this.signinFormGroup = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

}
