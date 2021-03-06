import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchesService } from '../matches.service';
import { LeagueTableService } from 'src/app/shared/leagueTable.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-scores-modal',
  templateUrl: './scores-modal.component.html',
  styleUrls: ['./scores-modal.component.css']
})
export class ScoresModalComponent implements OnInit {

  scoresForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, 
              private matchesService: MatchesService,
              public dialogRef: MatDialogRef<ScoresModalComponent>,
              private notify: NotificationService) { }

  ngOnInit() {
    this.scoresForm = new FormGroup({
      'firstTeamGoals': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*"),
      ]),
      'secondTeamGoals': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*"),
      ]),
    })
  }

  onSubmit(scoresForm, id) {
    if(!this.scoresForm.invalid) 
    {
      this.matchesService.addScores(scoresForm.value, id);
      this.matchesService.updateWinsAndDraws();
      this.scoresForm.reset();
      this.dialogRef.close();
      this.notify.successMessage('Scores have successfuly been added!');
    }
  }
}
