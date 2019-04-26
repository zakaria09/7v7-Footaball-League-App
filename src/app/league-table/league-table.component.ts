import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable, MatDialog, MatDialogConfig } from '@angular/material';
import { LeagueTableService } from '../shared/leagueTable.service';
import { TeamService } from '../shared/team.service';
import { EditTableComponent } from './edit-table/edit-table.component';
import { Subscription } from 'rxjs/Subscription';
import { Teams } from '../matches/teams';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../shared/notification.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit, AfterViewInit, OnDestroy {

  teamsTable: Subscription;
  private teams: Teams[] = [];

  user: User;

  tableData: MatTableDataSource<any>;

  displayedColumns = ['position', 'teamName', 'draws', 'wins', 'played', 'points', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private table: LeagueTableService,
              private teamservice: TeamService,
              public modal: MatDialog,
              private authservice: AuthService,
              private notification: NotificationService) {}

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.teamsTable = this.table
    .fetchTeams('teams')
    .subscribe((data: Teams[]) => {
      console.log('data',data)
      this.teams.push(...data);
      //this.table.tablePoints(data);
      this.tableData = new MatTableDataSource(data);
      this.tableData.sort = this.sort;
    });
    this.sort.sort(<MatSortable>({id: 'points', start: 'desc'}));
    
    this.authservice.user.subscribe(user => this.user = user);
  }
  
  openModal(teamName, teamId, wins, draws, played) {
    if(this.authservice.canEdit(this.user)) {
      this.modal.open(EditTableComponent, {
        width: '60%', 
        data: {
          teamName: teamName,
          teamId: teamId,
          wins,
          draws,
          played
        }
      });
  } else {
    this.notification.warnPermissions();
    }
  }

  deleteTeam(id) {
    if(this.authservice.canDelete(this.user)) {
    this.notification.successMessage('You\'ve Succesfully Deleted The Team!');
    this.teamservice.DeleteTeam(id);
    } else {
      this.notification.warnPermissions();
      }
  }

  ngOnDestroy() 
  {
    this.teamsTable.unsubscribe();
  }
}
