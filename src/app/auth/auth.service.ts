import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { User } from './user.model';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import "rxjs/add/observable/of";
import { auth } from 'firebase';
import { NotificationService } from '../shared/notification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<User>; // Save logged in user data

  user: Observable<User>;
  //user: Observable<User>;
  authState: firebase.User;

  allUsers: Observable<any>;

  authChange = new Subject<boolean>();
  // private isAuthenticated = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private snackbar: MatSnackBar,
    private notify: NotificationService
  ) 
  {
    // listen to the users that emitted from authstate
    // and switcth to it
    this.user = this.afAuth.authState.switchMap(user => {
      if(user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  fetchUsers() {
    this.allUsers = this.afs.collection('users').snapshotChanges();
    return this.allUsers;
}

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
  }

  sendVerificationEmail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.notify.successMessage('Please Check Your Email To Verify Your Account!')
      }).catch((error) => {
        this.notify.warnMessage('Bummer! ' + error.message);
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
      })
      .then(() => {
        this.router.navigate(['/profile']);
      })
      .catch((error) => {
        this.notify.warnMessage('Bummer! ' + error.message);
      });
      this.authChange.next(true);
  }

  loginUser(authData) {
    this.afAuth.auth.signInWithEmailAndPassword(
        authData.email, 
        authData.password)
            .then(result => {
              this.notify.successMessage('Hooray! Successfully Signed In');
              this.router.navigate(['/matches']);
            })
            .catch(err => {
              this.notify.warnMessage('Bummer! ' + err.message);
            });
        this.authChange.next(true);
  }

  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      this.notify.successMessage('Hooray! Successfully Signed In with Google');
      this.router.navigate(['/profile']);
      this.SetUserData(result.user);
    })
    .catch(err => {
      this.notify.warnMessage('Bummer! ' + err.message);
    });
    this.authChange.next(true);
  }

  async facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      this.notify.successMessage('Hooray! Successfully Signed In with Facebook');
      this.router.navigate(['/profile']);
      this.SetUserData(result.user);
    })
    .catch(err => {
      this.notify.warnMessage('Bummer! ' + err.message);
    });
    this.authChange.next(true);
  }

  get isAuth(): boolean {
    return this.authState !== null;
  }

  SetUserData(user, name?) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
    uid: user.uid,
    email: user.email,
    displayName: name || user.displayName,
    photoURL: user.photoURL || null,
    emailVerified: user.emailVerified,
    roles: {
      subscriber: true,
      editor: false,
      admin: false,
    }
  }
  return userRef.set(userData, {merge: true});
}

logout() {
  this.notify.warnMessage('You\'ve Logged Out')
  this.router.navigate(['/login']);
  this.afAuth.auth.signOut();
}

// reset password

resetPassword(email) {
  return this.afAuth.auth.sendPasswordResetEmail(email)
    .then(() => this.notify.successMessage(`Check Your Email: We've sent you a password reset link`))
    .catch(error => this.notify.warnMessage(error.message));
}

// Abilities and Roles Authorization 
// assigns roles to an abilities method

canRead(user: User): boolean {
  const allowed = ['admin', 'editor', 'subscriber'];
  return this.checkAuthorization(user, allowed)
}

canEdit(user: User): boolean {
  const allowed = ['admin', 'editor'];
  return this.checkAuthorization(user, allowed)
}

canDelete(user: User): boolean {
  const allowed = ['admin'];
  return this.checkAuthorization(user, allowed)
}

// determines if user has a matching role
private checkAuthorization(user: User, allowedRoles: string[]): boolean {
  if(!user) return false;
  for (const role of allowedRoles) {
    if(user.roles[role]) {
      return true;
    }
  }
  return false;
}

// update user roles

isEditor(docId, boolean) {
  this.afs.collection('users').doc(docId).update({
      roles: {
        subscriber: true,
        editor: boolean,
        admin: false
      }
    })
}

isAdmin(docId, boolean) {
  this.afs.collection('users').doc(docId).update({
      roles: {
        subscriber: true,
        editor: true,
        admin: boolean
      }
    })
}

isSubscriber(docId) {
  this.afs.collection('users').doc(docId).update({
      roles: {
        subscriber: true,
        editor: false,
        admin: false
      }
    })
}

giveUserTeam(docId, team) {
  this.afs.collection('users').doc(docId).update({
    team: team
  })
}

updateDisplayName(docId, newName) {
  this.afs.collection('users').doc(docId).update({
    displayName: newName
  })
}

updateProfileImage(docId, imageURL) {
  this.afs.collection('users').doc(docId).update({
    photoURL: imageURL
  })
}

deleteUser(id) {
  return this.afs.collection('users').doc(id).delete();
}
}
