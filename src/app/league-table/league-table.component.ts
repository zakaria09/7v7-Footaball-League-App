import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Team } from './Team';
import { MatTableDataSource, MatSort, MatSortable } from '@angular/material';
import { LeagueTableService } from '../shared/leagueTable.service';
import { TeamService } from '../shared/team.service';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit, AfterViewInit {


  tableData: MatTableDataSource<any>;

  displayedColumns = ['teamName', 'draws', 'wins', 'played', 'points'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private table: LeagueTableService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.table
    .fetchTeams('teams')
    .subscribe(data => {
      console.log('data',data)
      this.tableData = new MatTableDataSource(data)
      this.sort.sort(<MatSortable>({id: 'points', start: 'desc'}));
      this.tableData.sort = this.sort;
    });
    this.table.updatePoints();
  }
  
}
