import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../shared/theme.service';
import { LeagueTableService } from '../shared/leagueTable.service';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../shared/notification.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  otherTheme: boolean;
  user: User;

  constructor(public themeService: ThemeService,
              private leagueTable: LeagueTableService,
              private authservice: AuthService,
              private notification: NotificationService) { }

  ngOnInit() {
    this.themeService.currentTheme.subscribe(theme => this.otherTheme = theme);

    this.authservice.user.subscribe(user => this.user = user);
  }

  newTheme() {
    this.otherTheme = !this.otherTheme;
    this.themeService.changeTheme(this.otherTheme);
  }

  resetTable() {
    if(this.authservice.canDelete(this.user)) {
      this.leagueTable.resetLeagueTable();
      this.notification.successMessage('The League Table has been reset.');
    } else {
      this.notification.warnPermissions();
    }
  }
}
