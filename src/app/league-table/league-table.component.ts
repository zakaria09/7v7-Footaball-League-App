import { Component, OnInit } from '@angular/core';
import { Team } from './Team';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit {

  Teams: Team[] = [
    {name: 'Hydrogen FC', played: 4, goalsFor: 20, goalsAgainst: 4, points: 48},
    {name: 'Helium United', played: 4, goalsFor: 20, goalsAgainst: 4, points: 48},
    {name: 'Lithium United', played: 4, goalsFor: 20, goalsAgainst: 4, points: 48},
    {name: 'Beryllium FC', played: 4, goalsFor: 20, goalsAgainst: 4, points: 48},
    {name: 'Boro FC', played: 4, goalsFor: 20, goalsAgainst: 4, points: 48},
    {name: 'Carbo FC', played: 4, goalsFor: 20, goalsAgainst: 4, points: 48},
    {name: 'Nitrogen United', played: 4, goalsFor: 20, goalsAgainst: 4, points: 48},
    {name: 'Oxygen FC', played: 4, goalsFor: 20, goalsAgainst: 4, points: 48},
    {name: 'Fluorine United', played: 4, goalsFor: 20, goalsAgainst: 4, points: 48},
    {name: 'Neo United', played: 4, goalsFor: 20, goalsAgainst: 4, points: 48},
  ];

  displayedColumns = ['name', 'played', 'goalsFor', 'goalsAgainst', 'points'];
  dataSource = this.Teams;
  // new MatTableDataSource<Team>()

  constructor() { }

  ngOnInit() {
  }

}
