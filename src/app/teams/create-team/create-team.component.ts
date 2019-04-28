import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from 'src/app/shared/team.service';
import { Choices } from './Choices';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  teamForm: FormGroup;

  constructor(private teamservice: TeamService)  { }

  ngOnInit() {
    this.teamForm = new FormGroup({
      'teamName': new FormControl(null, Validators.required),
    }); 
  }

  onSubmit(teamForm) {
    if(!this.teamForm.invalid) {
      this.teamservice.createTeam(teamForm);
    }
    this.teamForm.reset();
  }
}
