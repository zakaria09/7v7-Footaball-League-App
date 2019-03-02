import { Component, OnInit } from '@angular/core';
import { Teams } from '../teams';
import { MatSnackBar, MAT_DATEPICKER_VALIDATORS } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-fixtures',
  templateUrl: './create-fixtures.component.html',
  styleUrls: ['./create-fixtures.component.css']
})
export class CreateFixturesComponent implements OnInit {

  teams: Teams[] = [
    {name: 'team 1'},
    {name: 'team 2'},
    {name: 'team 3'},
    {name: 'team 4'}
  ];

  firstTeam: string;
  secondTeam: string;

  //Form Validation

  fixturesForm: FormGroup;

  constructor(private snackBar: MatSnackBar) { }

  //success snackbar
  openSnackBar(teamone: string, teamtwo: string) {
    this.snackBar.open('Succesfully Added Fixture: ' + teamone + ' vs ' + teamtwo, 'Close', {
      duration: 3000,
    });
  }
  // Attention:
  // date needs a better validator to esnure its in correct format
  ngOnInit() {
    this.fixturesForm = new FormGroup({
      'firstTeam': new FormControl(null, Validators.required),
      'secondTeam': new FormControl(null, Validators.required),
      'date': new FormControl(null, [Validators.required]),
      'time': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    console.log(this.fixturesForm);
  }
}
