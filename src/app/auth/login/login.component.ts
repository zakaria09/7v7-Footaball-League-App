import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authservice: AuthService,
              public modal: MatDialog,) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {validators: [Validators.required]})
    });
  }

  onSubmit() {
    this.authservice.loginUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  googleLogin() {
    this.authservice.googleLogin();
  }

  openModal() {
      this.modal.open(ForgotPasswordComponent, {
        width: '60%', 
      });
  }

}
