import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, 
              public dialogRef: MatDialogRef<EditTableComponent>) { }

  ngOnInit() {
  }


}
