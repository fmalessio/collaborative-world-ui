import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, DisplayMessageBuilder } from 'src/app/shared/model/display-message';
import { LoginUserDTO } from '../../dto/auth.dto';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  displayMessage: DisplayMessage;
  signinFormGroup: FormGroup;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.displayMessage = DisplayMessageBuilder.buildEmpty();
  }

  ngOnInit() {
    this.createForm();
  }

  login() {
    this.displayMessage = DisplayMessageBuilder.buildEmpty();
    if (!this.signinFormGroup.valid) {
      this.displayMessage = DisplayMessageBuilder.buildError('Complete correctamente el formulario');
      return;
    }
    const data = this.signinFormGroup.getRawValue();
    const userLogin: LoginUserDTO = { username: data.email.trim(), password: data.password.trim() };
    this.authenticationService.login(userLogin).then(
      () => { },
      (error: string) => { this.displayMessage = DisplayMessageBuilder.buildError(error) });
  }

  private createForm() {
    this.signinFormGroup = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

}
