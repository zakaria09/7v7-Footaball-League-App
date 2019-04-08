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
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<User>; // Save logged in user data

  authState: any = null;
  //user: Observable<User>;

  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  private fbSubs: Subscription[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private snackbar: MatSnackBar,
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
        this.initAuthListener();
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

  loginUser(authData) {
    this.afAuth.auth.signInWithEmailAndPassword(
        authData.email, 
        authData.password)
            .then(result => {
              this.initAuthListener();
              this.router.navigate(['/matches']);
            })
            .catch(err => {
              this.snackbar.open(err.message, null, {
                duration: 3000
              });
            });
        this.authChange.next(true);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
}

  SetUserData(user: User, name) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
    uid: user.uid,
    email: user.email,
    displayName: name,
    nameToSearch: name.toLowerCase(),
    photoURL: user.photoURL,
    emailVerified: user.emailVerified
  }
  return userRef.set(userData)
}
}
