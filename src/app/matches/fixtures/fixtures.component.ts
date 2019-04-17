import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchesService } from '../matches.service';
import { map } from 'rxjs/operators';
import { Matches } from '../matches';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { ScoresModalComponent } from '../scores-modal/scores-modal.component';
import { LeagueTableService } from 'src/app/shared/leagueTable.service';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {
  // Matches[]
  // because th objects returned are 
  // exactly in that format
  matches: Observable<Matches[]>;
  user: User;

  constructor(private games: MatchesService,
              private dialog: MatDialog,
              private authservice: AuthService,
              private notification: NotificationService) { }

  ngOnInit() {
    this.matches = this.games
      .fetchMatches()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }
        })
      }))
      this.authservice.user.subscribe(user => this.user = user);
  }

  deleteFixture(id) {
    if(this.authservice.canDelete(this.user)) {
      this.games.deleteMatch(id);
    } else {
      this.notification.warnPermissions();
    }
  }

  openDialog(team1, team2, id) {
    if(this.authservice.canEdit(this.user)) {
      console.log(this.matches)
      this.dialog.open(ScoresModalComponent, {
        width: '70%',
        autoFocus: true,
        data: {
          id: id,
          team1: team1,
          team2: team2
        }
      });
    } else {
      this.notification.warnPermissions();
    }
  }
}
