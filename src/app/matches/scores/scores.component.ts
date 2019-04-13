import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Matches } from '../matches';
import { MatDialog } from '@angular/material';
import { ScoresModalComponent } from '../scores-modal/scores-modal.component';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { NotificationService } from 'src/app/shared/notification.service';


@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  scores: Observable<Matches[]>;
  user: User;

  constructor(private matches: MatchesService,
              private dialog: MatDialog,
              private authservice: AuthService,
              private notification: NotificationService) { }

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
    // finds the winners and if draw
    this.matches.addWinners();
    this.authservice.user.subscribe(user => this.user = user);
  }

  deleteScore(id) {
    if(this.authservice.canDelete(this.user)) {
      this.matches.deleteMatch(id);
    } else {
      this.notification.warnPermissions();
    }
  }

  warning() {
    alert('Warning: By editing scores the league table will also be affected!');
  }

  editScore(team1, team2, id) {
    if(this.authservice.canEdit(this.user)) {
      this.warning();
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
