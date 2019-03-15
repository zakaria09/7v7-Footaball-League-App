import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchesService } from '../matches.service';
import { map } from 'rxjs/operators';
import { Matches } from '../matches';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { ScoresModalComponent } from '../scores-modal/scores-modal.component';

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
  //items: Array<any>;

  constructor(private games: MatchesService,
              private dialog: MatDialog) { }

  // more info about pipe method at:
  //https://www.udemy.com/angular-full-app-with-angular-material-angularfire-ngrx/learn/v4/t/lecture/9912780?start=1

  ngOnInit() {
    console.log(this.games.fetchMatches());
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

  }

  deleteFixture(id) {
    this.games.deleteMatch(id);
  }

  openDialog(team1, team2, id) {
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
  }
}
