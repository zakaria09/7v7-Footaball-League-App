import { Component, OnInit} from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  otherTheme: boolean;

  constructor(public themeService: ThemeService) {
    this.themeService.currentTheme.subscribe(theme => this.otherTheme = theme);
  }
}
