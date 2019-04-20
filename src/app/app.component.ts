import { Component, OnInit} from '@angular/core';
import { ThemeService } from './shared/theme.service';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    //slider
  ]
})
export class AppComponent {
  otherTheme: boolean;

  constructor(public themeService: ThemeService) {
    this.themeService.currentTheme.subscribe(theme => this.otherTheme = theme);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
