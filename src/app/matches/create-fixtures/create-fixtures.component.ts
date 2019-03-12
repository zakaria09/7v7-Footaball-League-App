import { Component, OnInit } from '@angular/core';
import { Teams } from '../teams';
import { MatSnackBar, MAT_DATEPICKER_VALIDATORS } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatchesService } from '../matches.service';

@Component({
  selector: 'app-create-fixtures',
  templateUrl: './create-fixtures.component.html',
  styleUrls: ['./create-fixtures.component.css']
})
export class CreateFixturesComponent implements OnInit {

  teams: Teams[] = [
    {name: 'Intercontinetal FC'},
    {name: 'Teenage Mutant Ninja Skirtles'},
    {name: 'Harlem Spartans FC'},
    {name: 'Lakehay FC'},
    {name: 'Leather Jacket FC'},
  ];

  firstTeam: string;
  secondTeam: string;

  //Form Validation

  firstSelections: string = '';

  fixturesForm: FormGroup;

  constructor(private snackBar: MatSnackBar, private matchesService: MatchesService) { }

  //success snackbar
  openSnackBar(teamone: string, teamtwo: string) {
    this.snackBar.open('Succesfully Added Fixture: ' + teamone + ' vs ' + teamtwo, 'Close', {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.fixturesForm = new FormGroup({
      'firstTeam': new FormControl(null, Validators.required),
      'secondTeam': new FormControl(null, Validators.required),
      'date': new FormControl(null, [Validators.required]),
      'time': new FormControl(null, Validators.required)
    }); 
  }

  resetCreateFixtures() {
    this.fixturesForm.setValue({
      firstTeam: '',
      secondTeam: '',
      date: '',
      time: ''
    });
  }

  onSubmit(value) {
    if(!this.fixturesForm.invalid) {
      console.log(this.fixturesForm.value.date);
      this.matchesService.createMatches(value.value);
      this.resetCreateFixtures();
      this.fixturesForm.reset();
    }
  }

  setFirstValues(selectedValue) {
    this.firstSelections = selectedValue.value.firstTeam;
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
