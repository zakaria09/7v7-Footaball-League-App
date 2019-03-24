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


  tableData: MatTableDataSource<any>;

  displayedColumns = ['teamName', 'draws', 'wins'];

  constructor(private table: LeagueTableService) { }

  ngOnInit() {
    this.table
      .fetchTeams('teams')
      .subscribe(data => {
        console.log('data',data)
        this.tableData = new MatTableDataSource(data)
      })
  }
  
}
