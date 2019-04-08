import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ) {}

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.map(auth => {
            if(!auth) {
                this.router.navigate(['/signin']);
                return false;
            } else {
                return true;
            }
        });
    }
}
