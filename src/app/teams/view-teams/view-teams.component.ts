import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/shared/team.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-view-teams',
  templateUrl: './view-teams.component.html',
  styleUrls: ['./view-teams.component.css']
})
export class ViewTeamsComponent implements OnInit {
  //panelOpenState = false;
  teams: Observable<any>;

  players: Observable<any>;

  filter = {};

  constructor(private teamservice: TeamService,
              private authservice: AuthService) { }

  ngOnInit() {
    this.teams = this.teamservice
    .fetchTeams()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        }
      })
    }))

    this.players = this.authservice.fetchUsers()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        }
      })
    }))
  }
}
