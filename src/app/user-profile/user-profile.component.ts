import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';

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
  userId;

  constructor(public afAuth: AngularFireAuth,
              public auth: AuthService,
              public modal: MatDialog,) 
  {
  }

  ngOnInit() {
    this.auth.user.subscribe(auth => {
      this.displayName = auth.displayName;
      this.email = auth.email;
      this.emailVerified = auth.emailVerified;
      this.profilePic = auth.photoURL;
      this.userId = auth.uid;
    });
  }

  openModal(displayName, userId) {
    this.modal.open( EditProfileComponent, {
      width: '60%', 
      data: {
        displayName,
        userId
      }
    });
  }

  openImageModal(userId) {
    console.log(userId);
    this.modal.open( ProfileImageComponent, {
      width: '60%', 
      data: {
        userId
      }
    });
  }

}
