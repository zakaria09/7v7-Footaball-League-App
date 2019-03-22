import { Component, OnInit } from '@angular/core';
import { Team } from './Team';
import { MatTableDataSource } from '@angular/material';
import { LeagueTableService } from '../shared/leagueTable.service';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit {

  Teams: Team[] = [
    {name: 'Hydrogen FC', matchesPlayed: 4, wins: 4, draws: 0, loses: 0, goalDiference: 4, points: 12},
    {name: 'Helium United', matchesPlayed: 4, wins: 4, draws: 0, loses: 0, goalDiference: 4, points: 12},
    {name: 'Lithium United', matchesPlayed: 4, wins: 4, draws: 0, loses: 0, goalDiference: 4, points: 12},
    {name: 'Beryllium FC', matchesPlayed: 4, wins: 4, draws: 0, loses: 0, goalDiference: 4, points: 12},
    {name: 'Boro FC', matchesPlayed: 4, wins: 4, draws: 0, loses: 0, goalDiference: 4, points: 12},
    {name: 'Carbo FC', matchesPlayed: 4, wins: 4, draws: 0, loses: 0, goalDiference: 4, points: 12},
    {name: 'Nitrogen United', matchesPlayed: 4, wins: 4, draws: 0, loses: 0, goalDiference: 4, points: 12},
    {name: 'Oxygen FC', matchesPlayed: 4, wins: 4, draws: 0, loses: 0, goalDiference: 4, points: 12},
    {name: 'Fluorine United', matchesPlayed: 4, wins: 4, draws: 0, loses: 0, goalDiference: 4, points: 12},
    {name: 'Neo United', matchesPlayed: 4, wins: 4, draws: 0, loses: 0, goalDiference: 4, points: 12},
  ];

  

  displayedColumns = ['name', 'matchesPlayed', 'wins', 'draws', 'loses', 'goalDiference', 'points'];
  dataSource = this.Teams;

  constructor(private table: LeagueTableService) { }

  ngOnInit() {
    this.table.teamCollection = [];
    this.table.WinningTeams = [];
    this.table.getAllTeams();
    console.log(this.table.teamCollection);
    //this.table.teamCollection
    // for (const i of this.table.teamCollection) {
    //   console.log(i);
    // }
  }

}
