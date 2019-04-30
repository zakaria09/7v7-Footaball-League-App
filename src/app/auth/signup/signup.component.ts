import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate;
  signupForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.signupForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      terms: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {validators: [Validators.required]}),
      displayName: new FormControl('', {validators: [Validators.required]})
      });
  }

  onSubmit(signupForm) {
    this.authService.signUpUser(
      signupForm.email, 
      signupForm.password,
      signupForm.displayName);
  }
}
