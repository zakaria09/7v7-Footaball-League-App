import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  private fbSubs: Subscription[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
        if(user) {
            this.isAuthenticated = true;
            this.authChange.next(true);
            this.router.navigate(['/profile']);
        } else {
            this.cancelSubscriptions();
            this.authChange.next(false);
            this.router.navigate(['/signup']);
            this.isAuthenticated = false;
        }
    });
  }

  sendVerificationEmail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        alert('Please Check Your Email To Verify Your Account!')
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  signUpUser(email, password, name) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(
        email,
        password)
      .then((result) => {
        this.sendVerificationEmail();
        this.SetUserData(result.user, name);
        console.log(result.user.providerData);
      })
      .then(() => {
        this.router.navigate(['/profile']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
      this.authChange.next(true);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
}

  SetUserData(user, name) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
    uid: user.uid,
    email: user.email,
    displayName: name,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified
  }
  return userRef.set(userData)
}
}
