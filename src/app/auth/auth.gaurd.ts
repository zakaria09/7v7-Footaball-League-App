import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
      return this.auth.user.pipe(
        take(1),
        map(user => !!user),
        tap(loggedIn => {
          console.log('logged in: ', loggedIn);
          if (!loggedIn) {
            alert('access denied');
            this.router.navigate(['/auth']);
          }
        })
      );
    }
  }
