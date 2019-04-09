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
import 'rxjs/add/operator/switchMap';
import "rxjs/add/observable/of";
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<User>; // Save logged in user data

  user: Observable<User>;;
  //user: Observable<User>;
  authState: firebase.User;

  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  private fbSubs: Subscription[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private snackbar: MatSnackBar,
  ) 
  {
    this.user = this.afAuth.authState.switchMap(user => {
      if(user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
        if(user) {
            this.isAuthenticated = true;
            this.authChange.next(true);
            this.router.navigate(['/profile']);
        } else {
            this.cancelSubscriptions();
            this.authChange.next(false);
            this.router.navigate(['/login']);
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

  get isAuth(): boolean {
    return this.authState !== null;
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
    photoURL: user.photoURL || 
    "https://en.gravatar.com/avatar" + "/205e460b479e2e5b48aec07710c08d50" + "?d=mp",
    emailVerified: user.emailVerified
  }
  return userRef.set(userData)
}
}
