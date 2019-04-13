import { Component, OnInit } from '@angular/core';
import { Teams } from '../teams';
import { MatSnackBar, MAT_DATEPICKER_VALIDATORS } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchesService } from '../matches.service';
import { Observable, Subscription } from 'rxjs';
import { TeamService } from 'src/app/shared/team.service';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-create-fixtures',
  templateUrl: './create-fixtures.component.html',
  styleUrls: ['./create-fixtures.component.css']
})
export class CreateFixturesComponent implements OnInit {

  firstTeam: string;
  secondTeam: string;


  //Form Validation

  firstSelections: string = '';

  fixturesForm: FormGroup;
  teams: Observable<Teams>;

  constructor(private matchesService: MatchesService,
              private teamservice: TeamService,
              private datePipe: DatePipe,
              private notfication: NotificationService) { }

  //success snackbar
  openSnackBar(teamone: string, teamtwo: string) {
    this.notfication.openFixtureSnackBar(teamone, teamtwo);
  }

  ngOnInit() {
    this.fixturesForm = new FormGroup({
      'firstTeam': new FormControl(null, Validators.required),
      'secondTeam': new FormControl(null, Validators.required),
      'date': new FormControl(null, [Validators.required]),
      'time': new FormControl(null, Validators.required)
    }); 
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

  onSubmit(data) {
    if(!this.fixturesForm.invalid) {
      this.matchesService.createMatches({
        firstTeamId: data.value.firstTeam.id,
        secondTeamId: data.value.secondTeam.id,
        firstTeamDraws: data.value.firstTeam.draws,
        secondTeamDraws: data.value.secondTeam.draws,
        firstTeamWins: data.value.firstTeam.wins,
        secondTeamWins: data.value.secondTeam.wins,
        firstTeamPlayed: data.value.firstTeam.played,
        secondTeamPlayed: data.value.secondTeam.played,
        firstTeam: data.value.firstTeam.teamName,
        secondTeam: data.value.secondTeam.teamName,
        date: this.datePipe.transform(data.value.date, 'yyyy-MM-dd'),
        time: data.value.time,
      });
      this.fixturesForm.reset();
    }
  }

  setFirstValues(selectedValue) {
    this.firstSelections = selectedValue.value.firstTeam.teamName;
  }

  isEmpty() {
    // returns empty string which is false
    return this.firstSelections == '';
  }

  isSame(name) {
    // returns the first team selected dropdown
    return this.firstSelections.includes(name);
  }
}
