import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class NotificationService {

    config: MatSnackBarConfig = {
        duration: 3500,
      }

    constructor(private snackBar: MatSnackBar) {}

    openFixtureSnackBar(teamOne, teamTwo) {
        this.config['panelClass'] = ['success'];
        this.snackBar.open('Succesfully Added Fixture:' + teamOne + ' vs ' + teamTwo, 'Close', {
            duration: 3000,
          });
    }

    warnPermissions() {
        this.config['panelClass'] = ['warn'];
        this.snackBar.open('You are not allowed to do that!', '', this.config);
    }

    accessDeniedPermissions() {
        this.config['panelClass'] = ['warn'];
        this.snackBar.open('Access Denied! You Must be an Admin To Enter This Route.', '', this.config);
    }

    warnMessage(msg) {
        this.config['panelClass'] = ['warn'];
        this.snackBar.open(msg, '', this.config);
    }

    successMessage(msg) {
        this.config['panelClass'] = ['success'];
        this.snackBar.open(msg, '', this.config);
    }

}