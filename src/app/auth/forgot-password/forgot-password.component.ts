import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailForm: FormGroup;

  constructor(private authservice: AuthService) { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
    });
  }

  onSubmit(form) {
    console.log(form.value.email);
    this.authservice.resetPassword(form.value.email);
    this.emailForm.clearValidators();
    this.emailForm.reset();
  }

}
