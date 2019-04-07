import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(private router: Router, private authservice: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.authservice.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }
}