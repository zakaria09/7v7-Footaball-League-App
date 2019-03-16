import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Matches } from '../matches';
import { MatDialog } from '@angular/material';
import { ScoresModalComponent } from '../scores-modal/scores-modal.component';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  scores: Observable<Matches[]>;

  constructor(private matches: MatchesService,
              private dialog: MatDialog) { }

  ngOnInit() {
    //console.log(this.matches.fetchMatches());
    this.scores = this.matches
    .fetchMatches()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data(),
        }
      })
    }))
    this.scores.subscribe(res => {
      //console.log(res);
    })
    this.matches.addWinners()
  }

  deleteScore(id) {
    this.matches.deleteMatch(id);
  }

  editScore(team1, team2, id) {
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
