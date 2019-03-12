import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchesService } from '../matches.service';

@Component({
  selector: 'app-scores-modal',
  templateUrl: './scores-modal.component.html',
  styleUrls: ['./scores-modal.component.css']
})
export class ScoresModalComponent implements OnInit {

  scoresForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, 
              private matchesService: MatchesService) { }

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
    console.log('form', scoresForm.value, 'id', id);
    this.matchesService.addScores(scoresForm.value, id);
    this.scoresForm.reset();
  }
}
