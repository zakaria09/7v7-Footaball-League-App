import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,
              private authservice: AuthService) { }

  ngOnInit() {
  }

  onLogout() {
    this.authservice.logout();
  }

}
