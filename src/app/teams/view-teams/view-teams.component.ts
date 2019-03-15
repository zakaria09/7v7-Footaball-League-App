import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/shared/team.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-teams',
  templateUrl: './view-teams.component.html',
  styleUrls: ['./view-teams.component.css']
})
export class ViewTeamsComponent implements OnInit {
  //panelOpenState = false;
  teams: Observable<any>;

  constructor(private teamservice: TeamService) { }

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
  }

}
