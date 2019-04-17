import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { NotificationService } from '../shared/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService,
              private notification: NotificationService) {}

  canActivate (
    next: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user.pipe(
      take(1),
      map(user => user && user.roles.admin ? true: false),
      tap(isAdmin => {
        if (!isAdmin) {
          this.notification.accessDeniedPermissions();
        }
      })
    );
  }

  
}
