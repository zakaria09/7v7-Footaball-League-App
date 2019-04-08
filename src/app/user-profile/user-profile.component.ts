import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  displayName;
  email;
  user;

  constructor(public afAuth: AngularFireAuth,
              public auth: AuthService) 
  {}

  ngOnInit() {
    this.user = this.afAuth.auth.currentUser
    this.displayName = this.afAuth.auth.currentUser.displayName;
    this.email = this.afAuth.auth.currentUser.email
    console.log(this.displayName, this.email, this.user);
  }

}
