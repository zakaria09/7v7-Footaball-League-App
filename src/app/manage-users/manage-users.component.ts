import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from '../shared/notification.service';
import { TeamService } from '../shared/team.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  accounts: Observable<any>;

  teams: Observable<any>;

  constructor(private authservice: AuthService,
              private notify: NotificationService,
              private teamservice: TeamService) { }

  ngOnInit() {
    this.accounts = this.authservice.fetchUsers()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }
        })
      }))
    
    this.teams = this.teamservice.fetchTeams()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }
        })
      }))
  }

  makeEditor(id) {
    this.authservice.isEditor(id, true);
  }

  makeAdmin(id) {
    this.authservice.isAdmin(id, true);
  }

  makeSubscriber(id) {
    this.authservice.isSubscriber(id);
  }

  assignTeam(id, team) {
    this.notify.successMessage('This person now has a team!')
    this.authservice.giveUserTeam(id, team);
  }

  deleteUser(id) {
    this.notify.warnMessage('Users Account has been deleted!')
    this.authservice.deleteUser(id);
  }
}
