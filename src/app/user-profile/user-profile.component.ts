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
  emailVerified;
  profilePic;

  constructor(public afAuth: AngularFireAuth,
              public auth: AuthService) 
  {
  }

  ngOnInit() {
    this.auth.user.subscribe(auth => {
      console.log(auth);
      this.displayName = auth.displayName;
      this.email = auth.email;
      this.emailVerified = auth.emailVerified;
      this.profilePic = auth.photoURL;
    });
  }

}
