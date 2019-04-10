import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(private afAuth: AngularFireAuth, private router: Router) {}

    canActivate(): Observable<boolean> {
      return this.afAuth.authState.map(auth => {
          if(!auth) {
              this.router.navigate(['/login']);
              return false;
          } else {
              return true;
          }
      });
  }
  }
