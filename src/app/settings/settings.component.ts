import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ThemeService } from '../shared/theme.service';
import { LeagueTableService } from '../shared/leagueTable.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  otherTheme: boolean;

  constructor(public themeService: ThemeService,
              private leagueTable: LeagueTableService) { }

  ngOnInit() {
    this.themeService.currentTheme.subscribe(theme => this.otherTheme = theme);
  }

  newTheme() {
    console.log(this.otherTheme);
    this.otherTheme = !this.otherTheme;
    this.themeService.changeTheme(this.otherTheme);
  }

  resetTable() {
    this.leagueTable.resetLeagueTable();
  }
}
