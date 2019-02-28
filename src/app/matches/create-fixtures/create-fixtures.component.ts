import { Component, OnInit } from '@angular/core';
import { Teams } from '../teams';
import { MatSnackBar } from '@angular/material';

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

  //Validation Needed!

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(teamone: string, teamtwo: string) {
    this.snackBar.open('Succesfully Added Fixture: ' + teamone + ' vs ' + teamtwo, 'Close', {
      duration: 3000,
    });
  }

  ngOnInit() {
  }

}
