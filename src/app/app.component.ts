import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  otherTheme: boolean = false

  @Output() toggleTheme = new EventEmitter<boolean>();

  changeTheme() {
    this.otherTheme = !this.otherTheme;
  }

  newTheme() {
    // emit the event
    this.toggleTheme.emit(this.otherTheme = true);
  }
}
