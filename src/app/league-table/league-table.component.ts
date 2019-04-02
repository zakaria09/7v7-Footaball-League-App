import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable, MatDialog } from '@angular/material';
import { LeagueTableService } from '../shared/leagueTable.service';
import { TeamService } from '../shared/team.service';
import { EditTableComponent } from './edit-table/edit-table.component';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit, AfterViewInit {


  tableData: MatTableDataSource<any>;

  displayedColumns = ['position', 'teamName', 'draws', 'wins', 'played', 'points', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private table: LeagueTableService,
              public dialog: MatDialog) { }

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
  
  openDialog(teamName, teamId, wins, draws, played) {
    this.dialog.open(EditTableComponent, {
      width: '70%',
      autoFocus: true,
      data: {
        teamName: teamName,
        teamId: teamId,
        wins,
        draws,
        played
      }
    });
  }
}
