import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LeagueTableService } from 'src/app/shared/leagueTable.service';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, 
              public dialogRef: MatDialogRef<EditTableComponent>,
              private table: LeagueTableService) { }

  ngOnInit() {
  }

  addWin(id, teamObj) {
    this.table.incrementWins(id, teamObj);
  }

  addDraw(id, teamObj) {
    this.table.incrementDraws(id, teamObj);
  }

  addPlayed(id, teamObj) {
    this.table.incrementPlayed(id, teamObj);
  }

  minusWin(id, teamObj) {
    this.table.decrementWins(id, teamObj);
  }

  minusDraw(id, teamObj) {
    this.table.decrementDraws(id, teamObj);
  }

  minusPlayed(id, teamObj) {
    this.table.decrementPlayed(id, teamObj);
  }
}
